(function(){"use strict";let e=null;document.getElementById("pgtForm").addEventListener("submit",function(t){t.preventDefault();const n={age:parseInt(document.getElementById("age").value),amh:parseFloat(document.getElementById("amh").value),afc:parseInt(document.getElementById("afc").value),fsh:parseFloat(document.getElementById("fsh").value),lh:parseFloat(document.getElementById("lh").value),e2:parseFloat(document.getElementById("e2").value),uterine:document.getElementById("uterineCondition").value,otherMedicalHistory:document.getElementById("otherMedicalHistory").value,liveBirth:parseInt(document.getElementById("liveBirthsCount").value),miscarriage:parseInt(document.getElementById("miscarriageCount").value),height:parseFloat(document.getElementById("heightCm").value),weight:parseFloat(document.getElementById("weightKg").value)},E=e=>{let n=e.age<=30?40:e.age<=35?35:e.age<=38?25:e.age<=42?12:5,s=e.amh<1?.5:e.amh<=2?.9:e.amh<4?1.2:1.5,o=e.afc<4?.35:e.afc<=8?.8:e.afc<15?1.25:1.6,i=o*.6+s*.4,t=e.fsh<8?1.2:e.fsh<=10?1:e.fsh<=12?.8:e.fsh<=15?.6:.3;(e.lh/e.fsh>2||e.lh<2)&&(t*=.85);let a=e.e2<50?1:e.e2<=80?.8:.5;return Math.min(Math.max(Math.round(n*i*t*a*1.8),1),100)},a=E(n),_=(.6+Math.min(n.amh,4)/4*.3)*(n.fsh>12?.85:1)*(n.e2>80?.8:1),h=Math.min(Math.max(n.afc*_,Math.min(n.afc,1)),n.afc*.9),y=e=>e<=30?.7:e<=35?.6:e<=38?.45:e<=42?.3:.15;let p=.85*.9*y(n.age);(n.lh/n.fsh>2||n.lh/n.fsh<.5)&&(p*=.85);const l=h*p*(.75+.25*(a/100)),C=e=>e<=30?.75:e<=35?.65:e<=38?.45:e<=42?.2:.05,d=C(n.age),i=l*d,T=i>0?.99-(1-d)**Math.max(l,1):0,r=n.weight/(n.height/100)**2;let j={normal:1,fibroids_polyps_managed:.9,adenomyosis_endo:.62,congenital_anomalies:.85,other_unmanaged:.5}[n.uterine],o=1;n.liveBirth>0?(o=1.08,n.miscarriage>=3?o*=.85:n.miscarriage>0&&(o*=.92)):n.miscarriage==1?o=.95:n.miscarriage==2?o=.88:n.miscarriage>=3&&(o=.7);let x=r>=28||r<18?.88:r>=25?.95:1;const O={none:1,mild_managed:.94,immune_severe_managed:.82,unmanaged_severe:.45}[n.otherMedicalHistory],s=j*o*x*O,c=Math.min(Math.max(.65*s,.05),.72),f=Math.log(.15)/Math.log(1-c),w=Math.max(i,.1);let m=Math.ceil(f/w);i>=f*.85&&(m=1);const b=Math.min(m,5),v=Math.ceil(Math.log(1-.85)/Math.log(1-c)),g=Math.min(Math.max(i>0?(1-(1-c)**Math.max(i,1))*100:a*.35,2),88),k=e=>e<35?"【最佳/良好】卵子数量和质量相对较好，胚胎染色体异常率处于较低水平。":e<40?"【中等/下降】卵子质量开始波动，染色体非整倍体风险升高，PGT-A 筛查的必要性显著增加。":"【显著下降】高龄因素导致卵母细胞损耗严重，需重点关注胚胎过检率及活产率的对冲风险。",A=e=>e>=2.5?"【理想】卵巢储备充沛，获卵数基数大，具备多次养成囊胚的物质基础。":e>=1?"【一般/偏低】储备尚可，但动员效率受限，建议采用个体化方案以提高利用率。":"【预警/极低】储备面临挑战，可能需要通过多促排（积攒周期）来获取足够种子。",S=(e,t)=>e==="normal"&&t>=1?"【理想】子宫环境良好，内膜容受性经评估处于最优状态，利于胚胎定植。":e==="adenomyosis_endo"?"【严峻】内异症/腺肌症可能干扰局部微环境，建议移植前进行降调或免疫调理。":"【需关注】环境存在修正折损，建议通过宫腔复查或内膜准备流程优化环境。";document.getElementById("lbrDisplay").innerText=g.toFixed(1)+"%",document.getElementById("cycleDisplay").innerText=`${b} 促 ${v} 移`;const M=[{title:"种子储备/质量",status:a>=80?"最优":a>=60?"良好":a>=40?"一般":"需调理",info:`评分 ${a}，预估单次获健康种子 ${i.toFixed(1)} 枚。`},{title:"健康囊胚预期",status:n.age<=30?"最优":n.age<=38?"良好":n.age<=42?"一般":"需调理",info:`${n.age}岁段 PGT 过检率约 ${(d*100).toFixed(0)}%。`},{title:"土壤/全身状况",status:s>=.9?"最优":s>=.8?"良好":s>=.65?"一般":"需调理",info:`环境系数 ${(s*100).toFixed(0)}%，单颗胚胎着床预期 ${(c*100).toFixed(1)}%。`}];document.getElementById("dimensionCards").innerHTML=M.map(e=>`
            <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div class="flex justify-between items-center mb-3">
                    <h5 class="font-bold text-gray-800 text-xs">${e.title}</h5>
                    <span class="px-2 py-1 text-[10px] font-black rounded-lg ${e.status==="最优"?"bg-emerald-50 text-emerald-500":e.status==="良好"?"bg-blue-50 text-blue-500":e.status==="一般"?"bg-amber-50 text-amber-500":"bg-rose-50 text-rose-500"}">${e.status}</span>
                </div>
                <p class="text-[11px] text-gray-400 leading-relaxed">${e.info}</p>
            </div>`).join(""),document.getElementById("expertReportContent").innerHTML=`
            <section class="border-b border-gray-700 pb-10">
                <h5 class="text-rose-400 font-black text-sm uppercase tracking-widest mb-8 flex items-center">A. 数据解读和评估</h5>
                <div class="space-y-8 text-gray-300 text-sm leading-relaxed">
                    <div>
                        <p class="text-white font-bold mb-2 flex items-center">
                            <span class="w-1 h-1 bg-rose-500 rounded-full mr-2"></span> 卵巢储备评估 (年龄: ${n.age}岁 / AMH: ${n.amh})
                        </p>
                        <p class="pl-3 border-l border-gray-700">${k(n.age)} ${A(n.amh)}</p>
                    </div>

                    <div>
                        <p class="text-white font-bold mb-2 flex items-center">
                            <span class="w-1 h-1 bg-blue-500 rounded-full mr-2"></span> 内分泌与代谢 (FSH: ${n.fsh} / BMI: ${r.toFixed(1)})
                        </p>
                        <p class="pl-3 border-l border-gray-700">
                            ${n.fsh>10||n.lh>10?"性激素指标提示募集压力较大，建议通过方案微调优化卵子同步性。":"性激素基础指标稳健，利于获取高质量成熟卵子。"} 
                            ${r>=25||r<18.5?"当前 BMI 处于非理想区间，可能对着床环境产生细微干扰。":"BMI 处于健康理想区间，支持胚胎高质量定植。"}
                        </p>
                    </div>

                    <div>
                        <p class="text-white font-bold mb-2 flex items-center">
                            <span class="w-1 h-1 bg-emerald-500 rounded-full mr-2"></span> 土壤容受性与生育史 (环境系数: ${(s*100).toFixed(0)}%)
                        </p>
                        <p class="pl-3 border-l border-gray-700">
                            ${S(n.uterine,s)} 
                            ${n.liveBirth>0?"具备成功活产史，子宫容受性已获验证。":n.miscarriage>=2?"反复流产史提示 PGT-A 筛查在您的周期中具有决定性意义。":"无显著不利病史，建议按常规流程执行。"}
                        </p>
                    </div>
                </div>
            </section>

            <section class="border-b border-gray-700 pb-10">
                <h5 class="text-blue-400 font-black text-sm uppercase tracking-widest mb-6 flex items-center">B. 试管方案建议</h5>
                <div class="space-y-4 pl-3">
                    <p class="text-gray-300 text-sm"><span class="text-gray-500 font-bold mr-2">【促排策略】</span> ${n.amh<1.1||n.age>40?"高强度拮抗剂方案 / 积攒周期":"标准长方案 / 拮抗剂方案"}</p>
                    <p class="text-gray-300 text-sm"><span class="text-gray-500 font-bold mr-2">【实验室技术】</span> ICSI 受精 + PGT-A 染色体筛查</p>
                    <p class="text-gray-300 text-sm"><span class="text-gray-500 font-bold mr-2">【术前准备】</span> ${s<.8?"建议宫腔环境调理或免疫评估":"常规内膜准备流程"}</p>
                   <p class="text-gray-300 text-sm"><span class="text-gray-500 font-bold mr-2">【促排策略】</span>${m>1?"鉴于单周期产出预估低于积攒目标，建议采用积攒周期策略。":"当前产出预期可覆盖移植消耗，首选单周期方案。"}</p>

                </div>
            </section>


            <section>
                <h5 class="text-emerald-400 font-black text-sm uppercase tracking-widest mb-6 flex items-center">C. 临床路径规划</h5>
                <div class="space-y-6 pl-3">
                    <div>
                        <p class="text-gray-400 text-xs mb-1">积攒 3 枚健康胚胎安全目标</p>
                        <p class="text-xl font-black text-white italic">预计需 ${b} 个促排周期</p>
                    </div>
                    <div>
                        <p class="text-gray-400 text-xs mb-1">累计 LBR > 85% 目标</p>
                        <p class="text-xl font-black text-white italic">预计需 ${v} 次移植周期</p>
                    </div>
                    <div class="mt-8 pt-6 border-t border-gray-700 flex justify-between items-end">
                        <span class="text-gray-500 text-[10px] italic font-mono">ADSMed CORE V3.0 / EXPECTED SUCCESS</span>
                        <span class="text-rose-500 text-4xl font-black tracking-tighter">${g.toFixed(1)}%</span>
                    </div>
                </div>
            </section>
        `;const F=document.getElementById("funnelChart").getContext("2d");e&&e.destroy(),e=new Chart(F,{type:"bar",data:{labels:["预估获卵","配成胚胎","养成囊胚","健康囊胚"],datasets:[{data:[h.toFixed(1),(h*.75).toFixed(1),l.toFixed(1),i.toFixed(1)],backgroundColor:["#fecdd3","#fda4af","#fb7185","#e11d48"],borderRadius:10,barPercentage:.5}]},options:{indexAxis:"y",plugins:{legend:{display:!1}},scales:{x:{display:!1,beginAtZero:!0},y:{grid:{display:!1},ticks:{color:"#9ca3af",font:{size:10}}}}}});const u=document.getElementById("results");u.classList.remove("hidden"),u.classList.add("show"),u.scrollIntoView({behavior:"smooth"})})})()