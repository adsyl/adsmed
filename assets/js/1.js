(function() {
    'use strict';
    
    // 【新增 1/3】定义初始化函数，将原逻辑包裹其中
    function initAdsmedTool() {
        let funnelChart = null;       
        // 防御性检查：确保表单存在才绑定事件
        const form = document.getElementById('pgtForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // 1. 数据采集
            const d = {
                age: parseInt(document.getElementById('age').value),
                amh: parseFloat(document.getElementById('amh').value),
                afc: parseInt(document.getElementById('afc').value),
                fsh: parseFloat(document.getElementById('fsh').value),
                lh: parseFloat(document.getElementById('lh').value),
                e2: parseFloat(document.getElementById('e2').value),
                uterine: document.getElementById('uterineCondition').value,
                otherMedicalHistory: document.getElementById('otherMedicalHistory').value,
                liveBirth: parseInt(document.getElementById('liveBirthsCount').value),
                miscarriage: parseInt(document.getElementById('miscarriageCount').value),
                height: parseFloat(document.getElementById('heightCm').value),
                weight: parseFloat(document.getElementById('weightKg').value)
            };

            // 2. 核心精算模型 (评分逻辑)
            const getMedicalScore = (d) => {
                // 年龄的基础分应呈指数级下降,年龄基数分：30岁以下40分，31-35岁35分，36-38岁22分，39-42岁11分，43岁以上4分
                let ageBase = d.age <= 30 ? 40 : (d.age <= 35 ? 35 : (d.age <= 38 ? 22 : (d.age <= 42 ? 11 : 4)));

                // AMH和AFC的修正系数，AMH < 1.0显著降低评分，AFC < 4显著降低评分，两者均在2-5范围内有适度提升，超过4后提升趋缓
                let amhMod = d.amh < 1 ? 0.5 : (d.amh <= 2 ? 0.9 : (d.amh < 5 ? 1.5 : 1.6));
                let afcMod = d.afc < 4 ? 0.35 : (d.afc <= 8 ? 0.8 : (d.afc < 15 ? 1.25 : 1.6));
                let reserveFactor = (afcMod * 0.6) + (amhMod * 0.4);

                // FSH的修正系数，FSH < 8较好，8-10轻度受损，10-12中度受损，12-15重度受损，15以上极重度受损；同时考虑LH/FSH比值异常对质量的负面影响
                let fshMod = d.fsh < 8 ? 1.2 : (d.fsh <= 10 ? 1.0 : (d.fsh <= 12 ? 0.75 : (d.fsh <= 15 ? 0.45 : 0.15)));
                if ((d.lh / d.fsh) > 2.5 || d.lh < 1.5) fshMod *= 0.8; 
                let e2Mod = d.e2 < 50 ? 1.0 : (d.e2 <= 80 ? 0.85 : 0.6);
                return Math.min(Math.max(Math.round(ageBase * reserveFactor * fshMod * e2Mod * 1.8), 1), 100);
            };
            const totalScore = getMedicalScore(d);

            // 3. 损耗漏斗计算
            // 3.1 预期获卵 (AFC锚定法)
            const fshMobPenalty = d.fsh > 15 ? 0.5 : (d.fsh > 12 ? 0.75 : 1.0);           
            const mobRate = (0.6 + (Math.min(d.amh, 4) / 4) * 0.3) * fshMobPenalty * (d.e2 > 80 ? 0.8 : 1);
            const expectedEggs = Math.min(Math.max(d.afc * mobRate, Math.min(d.afc, 1)), d.afc * 0.9);
 
            // 3.2 预期配成胚胎和囊胚 (动态衰减模型 - 同步年龄段判定 + 性激素质量修正) 
            //胚胎配成率和养成率随着年龄增加呈非线性下降，且FSH/LH异常会进一步降低质量，最终形成一个动态衰减模型
            const getDynamicConv = (age) => {
                if (age <= 30) return 0.92; 
                if (age <= 35) return 0.86; 
                if (age <= 38) return 0.78;                
                if (age <= 40) return 0.68; 
                if (age <= 42) return 0.55; 
                return 0.40;
             };  
             let baseConv = getDynamicConv(d.age);
             if ((d.lh/d.fsh) > 2.0 || (d.lh/d.fsh) < 0.5) baseConv *= 0.82;          
             const DynamicConv = expectedEggs * baseConv *  (0.75 + (0.25 * (totalScore / 100)));
             
             //囊胚养成率同样受年龄影响，且染色体异常率升高会导致养成率进一步下降，形成一个动态衰减模型
            const getBlastRate = (age) => {
                if (age <= 30) return 0.85; 
                if (age <= 35) return 0.75; 
                if (age <= 38) return 0.60;                
                if (age <= 40) return 0.42; 
                if (age <= 42) return 0.18; 
                return 0.08;
            };
             let eRate2 = getBlastRate(d.age);
             const expectedBlasts = DynamicConv * eRate2;

            // 3.3 健康囊胚 (PGT-A整倍体率 - 胚胎过检率同步年龄段判定)
            const getEuploidRate = (age) => {
                if (age <= 30) return 0.88; 
                if (age <= 35) return 0.75;
                if (age <= 38) return 0.60;
                if (age <= 40) return 0.38;
                if (age <= 42) return 0.10; 
                return 0.04;
            };
            let eRate3 = getEuploidRate(d.age);
            const expectedEuploids = expectedBlasts * eRate3;

            // 计算“保底”概率：即至少获得一枚健康种子用于移植的概率
            const probAtLeastOne = expectedEuploids > 0 ? (0.99 - Math.pow(1 - eRate3, Math.max(expectedBlasts, 1))) : 0;

            // 4. 环境容受力修正 (土壤因素)
            const bmi = d.weight / ((d.height / 100) ** 2);
            let uBase = { 'normal': 1.0, 'fibroids_polyps_managed': 0.92, 'adenomyosis_endo': 0.55, 'congenital_anomalies': 0.82, 'other_unmanaged': 0.40 }[d.uterine];
            
            let historyMult = 1.0;
            if (d.liveBirth > 0) {
                historyMult = 1.10; 
                if (d.miscarriage >= 3) historyMult *= 0.80; 
                else if (d.miscarriage > 0) historyMult *= 0.90;
            } else {
                if (d.miscarriage == 1) historyMult = 0.95;
                else if (d.miscarriage == 2) historyMult = 0.85;
                else if (d.miscarriage >= 3) historyMult = 0.65;  // 无活产史但有多次流产，提示潜在的免疫或内环境问题，对评分有较大负面影响
            }

            let bmiMult = (bmi >= 28) ? 0.80 : (bmi < 18.5 ? 0.85 : (bmi >= 25 ? 0.95 : 1.0));
            const healthMult = { 'none': 1.0, 'mild_managed': 0.94, 'immune_severe_managed': 0.78, 'unmanaged_severe': 0.42 }[d.otherMedicalHistory];
            const finalEnvMult = uBase * historyMult * bmiMult * healthMult;

            //  --- 5. 最终活产率与双轴周期预估 ---
            // 5.1 单次移植成功率(STR)上限封顶70%，下限保底5%，符临床常识
            const singleSTR = Math.min(Math.max(0.68 * finalEnvMult, 0.05), 0.72);
            
            // 目标：85% 累计活产率所需的胚胎数
            const requiredSeeds = Math.log(0.15) / Math.log(1 - singleSTR);
            
            // 【供给量】：单次促排产出的健康种子预期
            const currentSupply = Math.max(expectedEuploids, 0.1);

            // 【周期预估】：需求 / 供给
            let opuCycles = Math.ceil(requiredSeeds / currentSupply);
            if (expectedEuploids >= requiredSeeds * 0.85) opuCycles = 1;
            const displayOPU = Math.min(opuCycles, 6);

            // 移植次数
            const transferCycles = Math.ceil(Math.log(0.15) / Math.log(1 - singleSTR));
            
            // 累计成功率(CLBR)逻辑：若预期无健康胚胎，则基于评分给予一个极低的生存概率
            const constrainedLBR = Math.min(Math.max(expectedEuploids > 0 ? (1 - Math.pow(1 - singleSTR, Math.max(expectedEuploids, 1))) * 100 : totalScore * 0.32, 2), 89);

            // 6. UI 渲染 (深度解读辅助函数)
            const getAgeDesc = (age) => {
                if (age <= 30) return "【最佳】卵子数量和质量最佳，胚胎染色体异常率处于很低水平。";                
                if (age <= 35) return "【良好】卵子数量和质量较好，胚胎染色体异常率处于较低水平。";
                if (age <= 38) return "【一般】卵子数量和质量一般，胚胎染色体异常率相对升高。";
                if (age <= 40) return "【下降】卵子数量和质量显著下降，染色体非整倍体风险显著升高。";
                return "【预警】卵子高龄效应明显，需重点关注胚胎过检率及活产率的对冲风险。";
            };
            const getAmhDesc = (amh) => {
                if (amh >= 4.0) return "【理想】卵巢储备充沛，获卵基数优势巨大，单次促排获得健康胚胎几率极大。";   
                if (amh >= 2.5) return "【一般】卵巢储备一般，获卵基数符合预期，可能需要1-2次促排。";
                if (amh >= 1.0) return "【偏低】卵巢储备下滑，获卵基数相对较少，多次促排是必要选择。";
                return "【预警】卵巢储备不足，建议采用多次促排积攒胚胎策略或考虑供卵策略。";
            };
            const getUterineDesc = (u, mult) => {
                if (u === "normal" && mult >= 0.95) return "【理想】子宫环境良好，内膜容受性经评估处于最优状态，利于胚胎定植。";
                if (u === "adenomyosis_endo") return "【严峻】内异症/腺肌症可能干扰局部微环境，建议移植前进行降调或免疫调理。";
                return "【需关注】环境存在折损风险，建议通过控制体重、宫腔复查或内膜准备等流程优化环境。";
            };

            // 6.1 基本看板
            document.getElementById('lbrDisplay').innerText = constrainedLBR.toFixed(1) + '%';
            document.getElementById('cycleDisplay').innerText = `${displayOPU} 促 ${transferCycles} 移`;

            // 6.2 维度卡片
            const cards = [
                { title: "种子储备/质量", status: totalScore >= 80 ? "最优" : (totalScore >= 60 ? "良好" : (totalScore >= 40 ? "一般" : "需调理")), info: `评分 ${totalScore}，预估单次促排可获健康胚胎 ${expectedEuploids.toFixed(1)} 枚。` },
                { title: "健康囊胚预期", status: d.age <= 30 ? "最优" : (d.age <= 38 ? "良好" : (d.age <= 42 ? "一般" : "需调理")), info: `${d.age}岁段 PGT 过检率约 ${(eRate3*100).toFixed(0)}%。` },
                { title: "土壤/全身状况", status: finalEnvMult >= 0.88 ? "最优" : (finalEnvMult >= 0.75 ? "良好" : (finalEnvMult >= 0.60 ? "一般" : "需调理")), info: `环境系数 ${(finalEnvMult*100).toFixed(0)}%，单胚胎着床率约 ${(singleSTR*100).toFixed(1)}%。` }
            ];
            document.getElementById('dimensionCards').innerHTML = cards.map(c => `
                <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div class="flex justify-between items-center mb-3">
                        <h5 class="font-bold text-gray-800 text-xs">${c.title}</h5>
                        <span class="px-2 py-1 text-[10px] font-black rounded-lg ${c.status==='最优'?'bg-emerald-50 text-emerald-500':c.status==='良好'?'bg-blue-50 text-blue-500':c.status==='一般'?'bg-amber-50 text-amber-500':'bg-rose-50 text-rose-500'}">${c.status}</span>
                    </div>
                    <p class="text-[11px] text-gray-400 leading-relaxed">${c.info}</p>
                </div>`).join('');

            // --- 6.3 纯净文本流专家报告 ---
            document.getElementById('expertReportContent').innerHTML = `
                <section class="border-b border-gray-700 pb-10">
                    <h5 class="text-rose-400 font-black text-sm uppercase tracking-widest mb-8 flex items-center">A. 数据解读和评估</h5>
                    <div class="space-y-8 text-gray-300 text-sm leading-relaxed">
                        <div>
                            <p class="text-white font-bold mb-2 flex items-center">
                                <span class="w-1 h-1 bg-rose-500 rounded-full mr-2"></span> 卵巢储备评估 (年龄: ${d.age}岁 / AMH: ${d.amh})
                            </p>
                            <p class="pl-3 border-l border-gray-700">${getAgeDesc(d.age)} ${getAmhDesc(d.amh)}</p>
                        </div>
                        <div>
                            <p class="text-white font-bold mb-2 flex items-center">
                                <span class="w-1 h-1 bg-blue-500 rounded-full mr-2"></span> 内分泌与代谢 (FSH: ${d.fsh} / BMI: ${bmi.toFixed(1)})
                            </p>
                            <p class="pl-3 border-l border-gray-700">
                                ${d.fsh > 10 || d.lh > 10 ? '性激素指标提示卵细胞募集压力较大，建议通过方案微调优化卵子同步性。' : '性激素基础指标稳健，利于获取高质量成熟卵子。'} 
                                ${bmi >= 25 || bmi < 18.5 ? '当前 BMI 处于非理想区间，会对胚胎养成和着床产生一定干扰。' : 'BMI 处于健康理想区间，支持胚胎高质量定植。'}
                            </p>
                        </div>
                        <div>
                            <p class="text-white font-bold mb-2 flex items-center">
                                <span class="w-1 h-1 bg-emerald-500 rounded-full mr-2"></span> 土壤容受性与生育史 (环境系数: ${(finalEnvMult*100).toFixed(0)}%)
                            </p>
                            <p class="pl-3 border-l border-gray-700">
                                ${getUterineDesc(d.uterine, finalEnvMult)} 
                                ${d.liveBirth > 0 ? '既往活产史是子宫环境的有力证明。' : (d.miscarriage >= 2 ? '多次流产病史强烈建议行胚胎染色体筛查。' : '无显著不利生育病史，建议按常规流程执行。')}
                            </p>
                        </div>
                    </div>
                </section>
                <section class="border-b border-gray-700 pb-10">
                    <h5 class="text-blue-400 font-black text-sm uppercase tracking-widest mb-6 flex items-center">B. 试管方案建议</h5>
                    <div class="space-y-4 pl-3">
                        <p class="text-gray-300 text-sm"><span class="text-gray-500 font-bold mr-2">【促排策略】</span> ${d.amh < 1.1 || d.age > 40 ? '高强度拮抗剂方案 / 积攒周期' : '标准短方案 / 拮抗剂方案'}</p>
                        <p class="text-gray-300 text-sm"><span class="text-gray-500 font-bold mr-2">【实验室技术】</span> ICSI 受精 + PGT-A 染色体筛查</p>
                        <p class="text-gray-300 text-sm"><span class="text-gray-500 font-bold mr-2">【术前准备】</span> ${finalEnvMult < 0.8 ? '建议宫腔环境调理或免疫评估' : '常规内膜准备'}</p>
                        <p class="text-gray-300 text-sm"><span class="text-gray-500 font-bold mr-2">【促排策略】</span>${opuCycles > 1 ? '鉴于单周期产出预估低于积攒目标，建议采用积攒周期策略。' : '当前取卵预期可覆盖移植消耗，首选单周期方案。'}</p>
                    </div>
                </section>
                <section>
                    <h5 class="text-emerald-400 font-black text-sm uppercase tracking-widest mb-6 flex items-center">C. 临床路径规划</h5>
                    <div class="space-y-6 pl-3">
                        <div>
                            <p class="text-gray-400 text-xs mb-1">积攒 ≥3 枚健康胚胎</p>
                            <p class="text-xl font-black text-white italic">预计需 ${displayOPU} 个促排周期</p>
                        </div>
                        <div>
                            <p class="text-gray-400 text-xs mb-1">实现累计 LBR > 85%成功率</p>
                            <p class="text-xl font-black text-white italic">预计需 ${transferCycles} 次移植周期</p>
                        </div>
                        <div class="mt-8 pt-6 border-t border-gray-700 flex justify-between items-end">
                            <span class="text-gray-500 text-[12px] italic font-mono">ADSMed CORE V3.12 / EXPECTED SUCCESS</span>
                            <span class="text-rose-500 text-4xl font-black tracking-tighter">${constrainedLBR.toFixed(1)}%</span>
                        </div>
                    </div>
                </section>
            `;

            // 7. 漏斗图
            const ctx = document.getElementById('funnelChart').getContext('2d');
            if (funnelChart) funnelChart.destroy();
            funnelChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['预估获卵', '受精胚胎', '养成囊胚', '健康囊胚'],
                    datasets: [{
                        data: [expectedEggs.toFixed(1), DynamicConv.toFixed(1), expectedBlasts.toFixed(1), expectedEuploids.toFixed(1)],
                        backgroundColor: ['#fecdd3', '#fda4af', '#fb7185', '#e11d48'],
                        borderRadius: 10, barPercentage: 0.5
                    }]
                },
                options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { display: false, beginAtZero: true }, y: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } } } }
            });

            // 8. 显示并跳转
            const resDiv = document.getElementById('results');
            resDiv.classList.remove('hidden'); resDiv.classList.add('show');
            resDiv.scrollIntoView({ behavior: 'smooth' });
            // --- 源代码结束 ---
        });
    }

    // 【新增 2/3】状态检查逻辑
    if (document.readyState === "loading") {
        // 如果文档还在解析，监听加载完成事件
        document.addEventListener("DOMContentLoaded", initAdsmedTool);
    } else {
        // 如果文档已经解析完成，直接执行
        initAdsmedTool();
    }
// 【新增 3/3】闭合 IIFE
})();