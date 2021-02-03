var eventBus = new Vue()

Vue.component('feedback', {
    template: `
     <div class="feedback">
 		
 		<section id="testimonials">
 		<h1>Testimonials</h1>
 		
 		<div class="decoration" style="width: 125px"></div>
        
        <!-- testimonials inputted in the 'contact' section will be displayed here-->
        <display-testimonials :responses="responses"></display-testimonials>
        </section>
        
        <section id="contact">
        <h1>Contact Us</h1>
        
        <div class="decoration" style="width: 125px"></div>
        
        <ul style = "display: block; align: center; margin: 20px; max-width: 1000px; ">
        <!--One tab for each type of feedback accepted-->
          <li class="tabs" 
                :class="{ activeTab: 
                selectedTab === tab }"
                v-for="(tab, index) in tabs"
                @click="selectedTab = tab"
                :key="tab"
                >{{ tab }}</li>
        </ul>
		
		  <!--different components are displayed based on the tab selected-->
          <contact-us v-show="selectedTab === 'Has Giving Back inspired you? Tell us about it!'"></contact-us>
          <ideas v-show="selectedTab ==='Ideas for future events:'"></ideas>
          
        </section>
      </div>
     `,
    data() {
      return {
          responses: [], //array to hold user input
          tabs: ['Has Giving Back inspired you? Tell us about it!', 'Ideas for future events:'],  //tab options
          selectedTab: 'Has Giving Back inspired you? Tell us about it!'  
      }
    },
      mounted() {
        eventBus.$on('feedback-submitted', response => {
          this.responses.push(response) //receive user input from a component and put it in the responses array
        })
      }
  })
 Vue.component('ideas', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
	  <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name"  class="form-control">
	  </p>
      <p>
        <label for="idea">Idea</label>      
        <textarea id="idea" v-model="idea"  class="form-control"></textarea>
      </p>
      <p>
        <input type="submit" value="Submit" class="submit"> 
      </p> 
      <!-- thank you message is displayed after form is submitted-->
        <span>
        {{message}}
      </span>
      <!--error messages are displayed if part of the form is not completed-->
      <ul>
		<li v-for="error in errors"
			style="display: block;">
			{{error}}
		</li>
	</ul>    
  
    </form>
    `,
    data() {
      return {
        name: null,
        idea: null,
        message: '',
        errors: []  //array to hold error messages
      }
    },
    methods: {
      onSubmit() {
        this.errors = [] //previous error messages are cleared when the submit button is pressed
        if (this.name && this.idea) { //save values if form was filled out properly
          let ideaResponse = {
            name: this.name, 
            idea: this.idea,
          }
          //clear form after accept values
          this.name = null 
          this.idea = null 
          this.message = "Thank you for your idea!"
        }
        //if the form was not completed properly, determine the errors and add them to the array
        else {
          if(!this.name) this.errors.push("Name required.")
          if(!this.idea) this.errors.push("Idea required.")
        }
      }
    }
  })

  Vue.component('contact-us', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name"  class="form-control">
      </p>

      <p>
        <label for="review">How has Giving Back inspired you?</label>      
        <textarea id="review" v-model="review"  class="form-control"></textarea>
      </p>
	  <p>
        <input type="submit" value="Submit" class="submit" style="margin-bottom: 0">  
        </p> 
     <!--display error messages-->       
     <ul>
      <li v-for="error in errors"
          style="display:block">{{error}}</li>
      </ul>
    </form>
    `,
    data() {
      return {
        name: null,
        review: null,
        errors: [] //array to hold errors
      }
    },
    methods: {
      onSubmit() {
        this.errors = []
        if (this.name && this.review) {
          let response = {
            name: this.name,
            review: this.review
          }
          eventBus.$emit('feedback-submitted', response) //emit that event occurred along with form data
          //reset form
          this.name = null 
          this.review = null
        }
        //if form was not completed, update errors array
        else { 
          if(!this.name) this.errors.push("Name required.")
          if(!this.review) this.errors.push("Response required.")
        }
      }
    }
  })

  Vue.component('display-testimonials', {
    props: {
      responses: {
        type: Array,
        required: false
      }
    },
    template: `
      <div>
      <!--Either display testimonials or message that testimonials weren't submitted yet-->
        <p v-if="!responses.length"
        	style="text-align: center">There are no testimonials yet.</p>  
        <!--height based on number of testimonials submitted-->          
        <div v-else :style= "{height: (height + 'px')}">
        	<div 
        	 class="card" v-for="(response, index) in responses" :key="index">
  				<div class="card-header"> {{ response.name }} says:</div>
  				<div class="card-body">
     					<p>{{ response.review }}</p>
  				</div>
			</div>
        </div>
    
      </div>
    `,
    computed:{
    	height(){
          return  (1 + Math.floor((this.responses.length- 1) /3)) * 300 
    	  //height should be 300px for every 3 cards
    	}
    }
  })

  
  var app = new Vue({
      el: '#testimonials_and_feedback'
  })