(function(){"use strict";function e(){let e=null;const t=document.getElementById("pgtForm");if(!t)return;t.addEventListener("submit",function(t){t.preventDefault();const n={age:parseInt(document.getElementById("age").value),amh:parseFloat(document.getElementById("amh").value),afc:parseInt(document.getElementById("afc").value),fsh:parseFloat(document.getElementById("fsh").value),lh:parseFloat(document.getElementById("lh").value),e2:parseFloat(document.getElementById("e2").value),uterine:document.getElementById("uterineCondition").value,otherMedicalHistory:document.getElementById("otherMedicalHistory").value,liveBirth:parseInt(document.getElementById("liveBirthsCount").value),miscarriage:parseInt(document.getElementById("miscarriageCount").value),height:parseFloat(document.getElementById("heightCm").value),weight:parseFloat(document.getElementById("weightKg").value)},C=e=>{let n=e.age<=30?40:e.age<=35?35:e.age<=38?22:e.age<=42?11:4,s=e.amh<1?.5:e.amh<=2?.9:e.amh<5?1.5:1.6,o=e.afc<4?.35:e.afc<=8?.8:e.afc<15?1.25:1.6,i=o*.6+s*.4,t=e.fsh<8?1.2:e.fsh<=10?1:e.fsh<=12?.75:e.fsh<=15?.45:.15;(e.lh/e.fsh>2.5||e.lh<1.5)&&(t*=.8);let a=e.e2<50?1:e.e2<=80?.85:.6;return Math.min(Math.max(Math.round(n*i*t*a*1.8),1),100)},a=C(n),j=n.fsh>15?.5:n.fsh>12?.75:1,w=(.6+Math.min(n.amh,4)/4*.3)*j*(n.e2>80?.8:1),u=Math.min(Math.max(n.afc*w,Math.min(n.afc,1)),n.afc*.9),_=e=>{let t,n;return e<=30?(t=.85,n=.85):e<=35?(t=.75,n=.7):e<=38?(t=.65,n=.6):(t=.45,n=.45),t*n},y=e=>e<=30?.85:e<=35?.65:e<=38?.5:e<=40?.32:e<=42?.18:.08;let f=_(n.age)*y(n.age);(n.lh/n.fsh>2||n.lh/n.fsh<.5)&&(f*=.82);const h=u*f*(.75+.25*(a/100)),A=e=>e<=30?.8:e<=35?.7:e<=38?.55:e<=40?.35:e<=42?.18:.05,m=A(n.age),o=h*m,D=o>0?.99-(1-m)**Math.max(h,1):0,r=n.weight/(n.height/100)**2;let k={normal:1,fibroids_polyps_managed:.92,adenomyosis_endo:.55,congenital_anomalies:.82,other_unmanaged:.4}[n.uterine],i=1;n.liveBirth>0?(i=1.1,n.miscarriage>=3?i*=.8:n.miscarriage>0&&(i*=.9)):n.miscarriage==1?i=.95:n.miscarriage==2?i=.85:n.miscarriage>=3&&(i=.65);let O=r>=28?.8:r<18.5?.85:r>=25?.95:1;const E={none:1,mild_managed:.94,immune_severe_managed:.78,unmanaged_severe:.42}[n.otherMedicalHistory],s=k*i*O*E,c=Math.min(Math.max(.68*s,.05),.72),p=Math.log(.15)/Math.log(1-c),x=Math.max(o,.1);let d=Math.ceil(p/x);o>=p*.85&&(d=1);const b=Math.min(d,6),v=Math.ceil(Math.log(.15)/Math.log(1-c)),g=Math.min(Math.max(o>0?(1-(1-c)**Math.max(o,1))*100:a*.32,2),89),S=e=>e<=30?"【最佳】卵子数量和质量最佳，胚胎染色体异常率处于很低水平。":e<=35?"【良好】卵子数量和质量较好，胚胎染色体异常率处于较低水平。":e<=38?"【一般】卵子数量和质量一般，胚胎染色体异常率相对升高。":e<=40?"【下降】卵子数量和质量显著下降，染色体非整倍体风险显著升高。":"【预警】卵子高龄效应明显，需重点关注胚胎过检率及活产率的对冲风险。",M=e=>e>=4?"【理想】卵巢储备充沛，获卵基数优势巨大，单次促排获得健康胚胎几率极大。":e>=2.5?"【一般】卵巢储备一般，获卵基数符合预期，可能需要1-2次促排。":e>=1?"【偏低】卵巢储备下滑，获卵基数相对较少，多次促排是必要选择。":"【预警】卵巢储备不足，建议采用多次促排积攒胚胎策略或考虑供卵策略。",F=(e,t)=>e==="normal"&&t>=.95?"【理想】子宫环境良好，内膜容受性经评估处于最优状态，利于胚胎定植。":e==="adenomyosis_endo"?"【严峻】内异症/腺肌症可能干扰局部微环境，建议移植前进行降调或免疫调理。":"【需关注】环境存在折损风险，建议通过控制体重、宫腔复查或内膜准备等流程优化环境。";document.getElementById("lbrDisplay").innerText=g.toFixed(1)+"%",document.getElementById("cycleDisplay").innerText=`${b} 促 ${v} 移`;const T=[{title:"种子储备/质量",status:a>=80?"最优":a>=60?"良好":a>=40?"一般":"需调理",info:`评分 ${a}，预估单次促排可获健康胚胎 ${o.toFixed(1)} 枚。`},{title:"健康囊胚预期",status:n.age<=30?"最优":n.age<=38?"良好":n.age<=42?"一般":"需调理",info:`${n.age}岁段 PGT 过检率约 ${(m*100).toFixed(0)}%。`},{title:"土壤/全身状况",status:s>=.88?"最优":s>=.75?"良好":s>=.6?"一般":"需调理",info:`环境系数 ${(s*100).toFixed(0)}%，单胚胎着床率约 ${(c*100).toFixed(1)}%。`}];document.getElementById("dimensionCards").innerHTML=T.map(e=>`
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
                            <p class="pl-3 border-l border-gray-700">${S(n.age)} ${M(n.amh)}</p>
                        </div>
                        <div>
                            <p class="text-white font-bold mb-2 flex items-center">
                                <span class="w-1 h-1 bg-blue-500 rounded-full mr-2"></span> 内分泌与代谢 (FSH: ${n.fsh} / BMI: ${r.toFixed(1)})
                            </p>
                            <p class="pl-3 border-l border-gray-700">
                                ${n.fsh>10||n.lh>10?"性激素指标提示卵细胞募集压力较大，建议通过方案微调优化卵子同步性。":"性激素基础指标稳健，利于获取高质量成熟卵子。"} 
                                ${r>=25||r<18.5?"当前 BMI 处于非理想区间，会对胚胎养成和着床产生一定干扰。":"BMI 处于健康理想区间，支持胚胎高质量定植。"}
                            </p>
                        </div>
                        <div>
                            <p class="text-white font-bold mb-2 flex items-center">
                                <span class="w-1 h-1 bg-emerald-500 rounded-full mr-2"></span> 土壤容受性与生育史 (环境系数: ${(s*100).toFixed(0)}%)
                            </p>
                            <p class="pl-3 border-l border-gray-700">
                                ${F(n.uterine,s)} 
                                ${n.liveBirth>0?"既往活产史是子宫环境的有力证明。":n.miscarriage>=2?"多次流产病史强烈建议行胚胎染色体筛查。":"无显著不利生育病史，建议按常规流程执行。"}
                            </p>
                        </div>
                    </div>
                </section>
                <section class="border-b border-gray-700 pb-10">
                    <h5 class="text-blue-400 font-black text-sm uppercase tracking-widest mb-6 flex items-center">B. 试管方案建议</h5>
                    <div class="space-y-4 pl-3">
                        <p class="text-gray-300 text-sm"><span class="text-gray-500 font-bold mr-2">【促排策略】</span> ${n.amh<1.1||n.age>40?"高强度拮抗剂方案 / 积攒周期":"标准短方案 / 拮抗剂方案"}</p>
                        <p class="text-gray-300 text-sm"><span class="text-gray-500 font-bold mr-2">【实验室技术】</span> ICSI 受精 + PGT-A 染色体筛查</p>
                        <p class="text-gray-300 text-sm"><span class="text-gray-500 font-bold mr-2">【术前准备】</span> ${s<.8?"建议宫腔环境调理或免疫评估":"常规内膜准备"}</p>
                        <p class="text-gray-300 text-sm"><span class="text-gray-500 font-bold mr-2">【促排策略】</span>${d>1?"鉴于单周期产出预估低于积攒目标，建议采用积攒周期策略。":"当前取卵预期可覆盖移植消耗，首选单周期方案。"}</p>
                    </div>
                </section>
                <section>
                    <h5 class="text-emerald-400 font-black text-sm uppercase tracking-widest mb-6 flex items-center">C. 临床路径规划</h5>
                    <div class="space-y-6 pl-3">
                        <div>
                            <p class="text-gray-400 text-xs mb-1">积攒 ≥3 枚健康胚胎</p>
                            <p class="text-xl font-black text-white italic">预计需 ${b} 个促排周期</p>
                        </div>
                        <div>
                            <p class="text-gray-400 text-xs mb-1">实现累计 LBR > 85%成功率</p>
                            <p class="text-xl font-black text-white italic">预计需 ${v} 次移植周期</p>
                        </div>
                        <div class="mt-8 pt-6 border-t border-gray-700 flex justify-between items-end">
                            <span class="text-gray-500 text-[12px] italic font-mono">ADSMed CORE V3.12 / EXPECTED SUCCESS</span>
                            <span class="text-rose-500 text-4xl font-black tracking-tighter">${g.toFixed(1)}%</span>
                        </div>
                    </div>
                </section>
            `;const z=document.getElementById("funnelChart").getContext("2d");e&&e.destroy(),e=new Chart(z,{type:"bar",data:{labels:["预估获卵","受精胚胎","养成囊胚","健康囊胚"],datasets:[{data:[u.toFixed(1),(u*.75).toFixed(1),h.toFixed(1),o.toFixed(1)],backgroundColor:["#fecdd3","#fda4af","#fb7185","#e11d48"],borderRadius:10,barPercentage:.5}]},options:{indexAxis:"y",plugins:{legend:{display:!1}},scales:{x:{display:!1,beginAtZero:!0},y:{grid:{display:!1},ticks:{color:"#9ca3af",font:{size:10}}}}}});const l=document.getElementById("results");l.classList.remove("hidden"),l.classList.add("show"),l.scrollIntoView({behavior:"smooth"})})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()})()