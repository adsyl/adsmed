/**
 * ADSMed PGT-A 精算引擎 V3.12
 * 核心逻辑：基于子宫容受性反推种子需求量 (Supply-Demand Balance Model)
 */
// assets/js/pgt-engine.js
var PGTEngine = {
    getScore: function(d) {
        let ageBase = d.age <= 30 ? 40 : (d.age <= 35 ? 35 : (d.age <= 38 ? 25 : (d.age <= 42 ? 12 : 5)));
        let amhM = d.amh < 1 ? 0.5 : (d.amh <= 2 ? 0.9 : 1.3);
        let afcM = d.afc < 4 ? 0.35 : (d.afc <= 10 ? 0.8 : 1.4);
        let fshM = d.fsh < 8 ? 1.2 : (d.fsh <= 10 ? 1.0 : (d.fsh <= 12 ? 0.8 : 0.4));
        let e2M = d.e2 < 80 ? 1.0 : 0.6;
        return Math.min(Math.round(ageBase * ((afcM * 0.6) + (amhM * 0.4)) * fshM * e2M * 1.8), 100);
    },
    run: function(d) {
        const score = this.getScore(d);
        const mob = (0.6 + (Math.min(d.amh, 4) / 4) * 0.3) * (d.fsh > 12 ? 0.85 : 1);
        const eggs = Math.min(d.afc * mob, d.afc * 0.9);
        const br = d.age<=30?0.7:d.age<=35?0.6:d.age<=38?0.45:d.age<=42?0.3:0.15;
        const blasts = eggs * 0.75 * br * (0.75 + 0.25*(score/100));
        const er = d.age<=30?0.75:d.age<=35?0.65:d.age<=38?0.45:d.age<=42?0.2:0.05;
        const euploids = blasts * er;
        const bmi = d.weight / ((d.height/100)**2);
        let uM = {'normal':1.0,'fibroids_polyps_managed':0.9,'adenomyosis_endo':0.62,'congenital_anomalies':0.85,'other_unmanaged':0.5}[d.uterine];
        let hM = d.liveBirth > 0 ? 1.08 : (d.miscarriage >= 3 ? 0.75 : (d.miscarriage >= 1 ? 0.92 : 1.0));
        const env = uM * hM * (bmi>28?0.88:1.0);
        const str = Math.min(Math.max(0.65 * env, 0.05), 0.72);
        const req = Math.log(0.15) / Math.log(1 - str);
        const opu = Math.ceil(req / Math.max(euploids, 0.1));
        return {
            score, eggs, blasts, euploids, er, env, str, req, 
            opu: Math.min(opu, 5), 
            tx: Math.ceil(Math.log(0.15) / Math.log(1 - str)),
            lbr: Math.min(Math.max(euploids > 0 ? (1 - Math.pow(1 - str, Math.max(euploids, 1))) * 100 : score * 0.35, 2), 88)
        };
    }
};
window.PGTEngine = PGTEngine; // 必须保留