import { defineStore } from 'pinia'

export const cuesStore = defineStore('cues', {
  state: () => ({
    bentopathState: false,
    pathListActive: true,
    cuesList: [],
    pathName: '',
    activeCueSegment: {},
    activeDougnnutData: {},
    bentopathLive: [],
    bentopathStages: [],
    stageCount: 0,
    pathRefContracts: {},
    cueColumnA: {},
    cueColumnB: {},
    cuesmenuList: [
      { name:'Nature', spaceid:'000988111', active: false, expand: true, glueup: '', gluedown: 'cuesNature' },{ name:'Environment', spaceid:'000988112', active: false, expand: true, glueup: '', gluedown: 'cuesEnvironment' },
      { name:'Culture', spaceid:'000988113', active: false, expand: true, glueup: '', gluedown: 'cuesCulture' },
      { name:'Life', spaceid:'000988114', active: false, expand: true, glueup: '', gluedown: 'cuesLife'},
      { name:'Body', spaceid:'002988114', active: false, expand: true, glueup: '', gluedown: 'cuesBody'},
      { name:'Longevity', spaceid:'000988115', active: false, expand: true, glueup: '', gluedown: 'cuesLongevity'},
      { name:'Biomarkers', spaceid:'000988116', active: false, expand: true, glueup: '', gluedown: 'cuesBiomarkers'}
    ],
    hopCues: {
      labels: ['Nature', 'Environment', 'Culture', 'Life'],
      datasets: [
        {
        backgroundColor: ['#09921c', '#920914', '#191fe7', '#560992'],
        data: [90, 90, 90, 90]
        }
      ]
    },
    hopCuesTest: {
      labels: ['Nature2', 'Environment2', 'Culture2', 'Life2'],
      datasets: [
        {
        backgroundColor: ['#09921c', '#920914', '#191fe7', '#560992'],
        data: [90, 90, 90, 90]
        }
      ]
    },
    cuesNature: {
      labels: [
        { name:'Universe', spaceid:'000981111', active: false, expand: true, glueup: 'Nature', gluedown: 'cuesNature' },
        { name:'Climate/weather', spaceid:'000982111', active: false, expand: true, glueup: 'Nature', gluedown: 'cuesNature' },
        { name:'Biodiversity', spaceid:'000983111', active: false, expand: true, glueup: 'Nature', gluedown: 'cuesNature' }
      ],
      datasets: [
        {
        backgroundColor: ['#098133', '#6aee63', '#09921c'],
        data: [30, 30, 30]
        }
      ]
    },
    cuesEnvironment: {
      labels: [
        { name:'Farming', spaceid:'003981111', active: false, expand: true, glueup: 'Environment', gluedown: 'cuesEnvironment' },
        { name:'Buildings', spaceid:'003981112', active: false, expand: true, glueup: 'Environment', gluedown: 'cuesEnvironment' },
        { name:'Travel', spaceid:'003981113', active: false, expand: true, glueup: 'Environment', gluedown: 'cuesEnvironment' }
      ],
      datasets: [
        {
        backgroundColor: ['#098133', '#6aee63', '#09921c'],
        data: [30, 30, 30]
        }
      ]
    },
    cuesCulture: {
      labels: [
        { name:'Money', spaceid:'003981111', active: false, expand: true, glueup: 'Culture', gluedown: 'cuesCulture' },
        { name:'Work', spaceid:'000381112', active: false, expand: true, glueup: 'Culture', gluedown: 'cuesCulture' },
        { name:'Music/Arts', spaceid:'000381113', active: false, expand: true, glueup: 'Culture', gluedown: 'cuesCulture' }
      ],
      datasets: [
        {
        backgroundColor: ['#0a22e8', '#838ddc', '#d2d7f8'],
        data: [30, 30, 30]
        }
      ]
    },
    cuesLife: {
      labels: [
        { name:'Food', spaceid:'004981111', active: false, expand: true, glueup: 'Life', gluedown: 'cuesLife' },
        { name:'Movement', spaceid:'004981112', active: false, expand: true, glueup: 'Life', gluedown: 'cuesLife' },
        { name:'Sleep/mind', spaceid:'004981113', active: false, expand: true, glueup: 'Life', gluedown: 'cuesLife' }
      ],
      datasets: [
        {
        backgroundColor: ['#d642cc' ,'#fa03ea', '#999999'],
        data: [30, 30, 30]
        }
      ]
    },
    cuesBody: {
      labels: [
        { name:'Heart', spaceid:'024981111', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Brain', spaceid:'024981112', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Liver', spaceid:'024981113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Thyroid', spaceid:'024981111', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Immune sytem', spaceid:'024981112', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Autoimmunity', spaceid:'024981113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Metabolic', spaceid:'024981111', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Nutrients', spaceid:'024981112', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Stress', spaceid:'024981113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Pancreas', spaceid:'024982113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Blood', spaceid:'024983113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Electrolytes', spaceid:'024984113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Urine', spaceid:'024985113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Allergies', spaceid:'024986113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Sexual health', spaceid:'024987113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Epigenetic clock', spaceid:'024988113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Muscle', spaceid:'224911113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Bones', spaceid:'324981113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Fat', spaceid:'424982113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Genes', spaceid:'524983113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },
        { name:'Epigenomics', spaceid:'624984113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },{ name:'Gastro. guts', spaceid:'624985113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },{ name:'Hair', spaceid:'624984113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },{ name:'Skin', spaceid:'624984113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },{ name:'Joints', spaceid:'624984113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },{ name:'Ears', spaceid:'624984113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },{ name:'Eyes', spaceid:'624984113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },{ name:'Mouth/teeth', spaceid:'624984113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },{ name:'', spaceid:'624984113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' },{ name:'', spaceid:'624984113', active: false, expand: true, glueup: 'Body', gluedown: 'cuesBody' }
      ],
      datasets: [
        {
        backgroundColor: ['#d642cc' ,'#fa03ea', '#999999'],
        data: [30, 30, 30]
        }
      ]
    },
    cuesLongevity: {
      labels: [
        { name:'Genomic instability', spaceid:'0704981111', active: false, expand: true, glueup: 'Longevity', gluedown: 'cuesLongevity' },
        { name:'Telomere attrition', spaceid:'0704981112', active: false, expand: true, glueup: 'Longevity', gluedown: 'cuesLongevity' },
        { name:'Epigenetic alterations', spaceid:'0704981113', active: false, expand: true, glueup: 'Longevity', gluedown: 'cuesLongevity' },
        { name:'Loss of proteostasis', spaceid:'0704981114', active: false, expand: true, glueup: 'Longevity', gluedown: 'cuesLongevity' },
        { name:'Deregulated nutrient-sensing', spaceid:'0704981115', active: false, expand: true, glueup: 'Longevity', gluedown: 'cuesLongevity' },
        { name:'Mitochondrial dysfunction', spaceid:'0704981116', active: false, expand: true, glueup: 'Longevity', gluedown: 'cuesLongevity' },
        { name:'Cellular senescence', spaceid:'0704981117', active: false, expand: true, glueup: 'Longevity', gluedown: 'cuesLongevity' },
        { name:'Stem cell exhaustion', spaceid:'0704981118', active: false, expand: true, glueup: 'Longevity', gluedown: 'cuesLongevity' },
        { name:'Altered intercellular communication', spaceid:'0704981119', active: false, expand: true, glueup: 'Longevity', gluedown: 'cuesLongevity' },
        { name:'besearch', spaceid:'0704981120', active: false, expand: true, glueup: 'Longevity', gluedown: 'cuesLongevity' }
      ],
      datasets: [
        {
        backgroundColor: ['#d642cc' ,'#fa03ea', '#999999'],
        data: [30, 30, 30]
        }
      ]
    },
    selectCues: {
    },
    cuesSegments: {
      labels: ['Universe', 'Climate/weather', 'Biodiversity', 'Farming', 'Buildings', 'Travel', 'Money', 'Work', 'Music/Arts', 'Food', 'Movement', 'Sleep/mind'],
      datasets: [
        {
        backgroundColor: ['#098133', '#6aee63', '#09921c', '#f44613', '#cc4119', '#99391d', '#0a22e8', '#838ddc', '#d2d7f8', '#8e4f8a', '#d642cc' ,'#fa03ea', '#999999'],
        data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
        }
      ]
    },
    natureBoundries: {
      labels: ['Novel entities', 'Ozone depletion', 'Aresol loading', 'Ocean acidification', 'Bio geochemical flows', 'Freshwater change', 'Landsystem change', 'Biosphere integrity', 'Climate change CO2', 'Climate radiating forcing', 'Besearch', 'Besearch'],
      datasets: [
        {
        backgroundColor: ['#191fe7', '#920914', '#09921c', '#560992', '#17c8d1', '#f08113', '#61819c', '#e66553', '#8bf5b0', '#181fe7' ,'#174fe7', '#999999'],
        data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
        }
      ]
    },
    natureBoundriesTwo: {
      labels: ['TWOovel entities', 'Ozone depletion', 'Aresol loading', 'Ocean acidification', 'Bio geochemical flows', 'Freshwater change', 'Landsystem change', 'Biosphere integrity', 'Climate change CO2', 'Climate radiating forcing', 'Besearch', 'Besearch'],
      datasets: [
        {
        backgroundColor: ['#191fe7', '#920914', '#09921c', '#560992', '#17c8d1', '#f08113', '#61819c', '#e66553', '#8bf5b0', '#181fe7' ,'#174fe7', '#999999'],
        data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
        }
      ]
    },
    longevityCues: {
      labels: [
        'Genomic instability',
        'Telomere attrition',
        'Epigenetic alterations',
        'Loss of proteostasis',
        'Deregulated nutrient-sensing',
        'Mitochondrial dysfunction',
        'Cellular senescence',
        'Stem cell exhaustion',
        'Altered intercellular communication',
        'besearch'
      ],
      datasets: [
        {
        backgroundColor: ['#191fe7', '#920914', '#09921c', '#560992', '#17c8d1', '#f08113', '#61819c', '#e66553', '#8bf5b0', '#999999'],
        data: [36, 36, 36, 36, 36, 36, 36, 36, 36, 36]
        }
      ]
    }
  }),
  actions: {
    processReply (received) {

    },
    setSpaceGlue () {
      this.selectCues = {
        cuesNature: this.cuesNature,
        cuesEnvironment: this.cuesEnvironment,
        cuesCulture: this.cuesCulture,
        cuesLife: this.cuesLife,
        cuesLongevity: this.cuesLongevity,
        cuesBody: this.cuesBody
      }
    }
  }
})