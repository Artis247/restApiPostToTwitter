import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js";

Vue.component("loader", {
  template: `
    <div style="display: flex;justify-content: center;align-items: center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  `,
});

new Vue({
  el: "#app",
  data() {
    return {
      loading: false,
      form: {
        post: "",
      },
      twitts: [ ],
      strings: [''],
      twitt: ''
   
    };
  },

  methods: {
    async splitPostToTwitts() {
      let { ...post } = this.form;
      let strings = [''];
      let twitts = [''];
      let indexArrayOfStrings = 0
      let indexArrayOfTwitts = 0
      const lehghtOfTwitt = 280
      
      strings = JSON.stringify(post).split(".")
     
   for (
     indexArrayOfStrings = 0;
        indexArrayOfStrings <= strings.length-1;
        indexArrayOfStrings++
      ){
        if ( 
            
         (twitts[indexArrayOfTwitts].length+strings[indexArrayOfStrings].length) <= lehghtOfTwitt
       
        ) {
       
          twitts[indexArrayOfTwitts] = twitts[indexArrayOfTwitts].concat(strings[indexArrayOfStrings])
       
          
        } else {
        
          indexArrayOfTwitts++
          twitts[indexArrayOfTwitts] = strings[indexArrayOfStrings]
                  
        }
      }
       this.twitts = Object.entries(twitts)
       let newTwitts = await request("/api/twitts", "POST", twitts)
      this.twitts[0]=twitts[0].slice(8)
      this.form.post = ''
    
    },


    async markTwitt(id) {
      let  twitt = this.twitts.find(c => c.id === id)
      let updated = await request(`/api/twitts/${id}`, "PUT", {
        ...twitt,
        marked: true,
      });
    //  twitt.marked = updated.marked
     
    },

    async removeTwitt(id) {
      await request(`/api/twitts/${id}`, 'DELETE')
      this.twitts = this.twitts.filter(c => c.id !== id)
      this.twitts = ['']
    }

  },
  async mounted() {
    this.loading = true
    this.twitts = await request("/api/twitts")
    this.loading = false
  },
});

async function request(url, method = "GET", data = null) {
  try {
    const headers = {}
    let body

    if (data) {
      headers["Content-Type"] = "application/json"
      body = JSON.stringify(data)
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    return await response.json()
  } catch (e) {
    console.warn("Error:", e.message)
  }
}
