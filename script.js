// 'use strict';
let currentMealCalendar=[];
let previousMealCalendar=[];
let totalMealIds = [];


function getHomeScreen() {
  $('.getStartedForm').on('submit', function (event){
    event.preventDefault();
    $('.getStartedScreen').toggleClass('hidden');
    console.log("working");
    $('.js-homeScreen').toggleClass('hidden');
  });
};

function getExistingMealCalendar() {
  $('.js-viewMealCalendarButton').on('click', function (event){
    event.preventDefault();
    $('.js-homeScreen').toggleClass('hidden');
    $('.js-backButton').toggleClass('hidden');
    if (currentMealCalendar.length == 0) {
      alert("You have not created a meal calendar yet. Please create a meal calendar first.")
    }
    else {
      getMealCalendarResults();
    }
  });
};

function backToHome() {
  $('.js-backButton').on('click', function (event){
    event.preventDefault();
    $('.js-homeScreen').toggleClass('hidden');
    $('.js-backButton').toggleClass('hidden');
    if ($('.js-mealCalendarScreen').hasClass('hidden') === false){
      $('.js-mealCalendarScreen').toggleClass('hidden');
    }
    
  });
}

// function foodPrefChecking(){
//   $('input[type=checkbox]').on('click', function(event){
//     this.checked = true;
//   });
// }

function getMealCalendarResults() {
  //This function will display the latest meal calendar with the most
  //recent food preferences.
  $('.foodPrefForm').submit(function(event){
    event.preventDefault();
    var totalOptions = [];
    var categoryOptions = [];
    var cuisineOptions = [];
    var beef = $("#beef").is(":checked");
    var pork = $("#pork").is(":checked");
    var chicken = $("#chicken").is(":checked");
    var seafood = $("#seafood").is(":checked");
    var lamb = $("#lamb").is(":checked");
    var vegan = $("#vegan").is(":checked");
    var pasta = $("#pasta").is(":checked");
    var vegetarian = $("#vegetarian").is(":checked");
    var american = $("#american").is(":checked");
    var british = $("#british").is(":checked");
    var canadian = $("#canadian").is(":checked");
    var chinese = $("#chinese").is(":checked");
    var dutch = $("#dutch").is(":checked");
    var french = $("#french").is(":checked");
    var greek = $("#greek").is(":checked");
    var indian = $("#indian").is(":checked");
    var irish = $("#irish").is(":checked");
    var italian = $("#italian").is(":checked");
    var jamaican = $("#jamaican").is(":checked");
    var japanese = $("#japanese").is(":checked");
    var malaysian = $("#malaysian").is(":checked");
    var mexican = $("#mexican").is(":checked");
    var moroccan = $("#moroccan").is(":checked");
    var russian = $("#russian").is(":checked");
    var spanish = $("#spanish").is(":checked");
    var thai = $("#thai").is(":checked");
    var vietnamese = $("#vietnamese").is(":checked");
    if(beef) categoryOptions.push("beef");
    if(pork) categoryOptions.push("pork");
    if(chicken) categoryOptions.push("chicken");
    if(seafood) categoryOptions.push("seafood");
    if(lamb) categoryOptions.push("lamb");
    if(vegan) categoryOptions.push("vegan");
    if(pasta) categoryOptions.push("pasta");
    if(vegetarian) categoryOptions.push("vegetarian");
    if(american) cuisineOptions.push("american");
    if(british) cuisineOptions.push("british");
    if(canadian) cuisineOptions.push("canadian");
    if(chinese) cuisineOptions.push("chinese");
    if(dutch) cuisineOptions.push("dutch");
    if(french) cuisineOptions.push("french");
    if(greek) cuisineOptions.push("greek");
    if(indian) cuisineOptions.push("indian");
    if(irish) cuisineOptions.push("irish");
    if(italian) cuisineOptions.push("italian");
    if(jamaican) cuisineOptions.push("jamaican");
    if(japanese) cuisineOptions.push("japanese");
    if(malaysian) cuisineOptions.push("malaysian");
    if(mexican) cuisineOptions.push("mexican");
    if(moroccan) cuisineOptions.push("moroccan");
    if(russian) cuisineOptions.push("russian");
    if(spanish) cuisineOptions.push("spanish");
    if(thai) cuisineOptions.push("thai");
    if(vietnamese) cuisineOptions.push("vietnamese");

    categoryOptions.forEach(function (element){
      totalOptions.push(element);
    });
    cuisineOptions.forEach(function (element){
      totalOptions.push(element);
    });
  
    console.log(totalOptions);
    if(totalOptions.length === 0 ) {
      alert("You must make a selection!");
      return;
    } else {
      $('.js-mealCalendarScreen').toggleClass('hidden');
      $('.js-foodPrefScreen').toggleClass('hidden');
      $('.js-backButton').toggleClass('hidden');
      getFoodCategories(categoryOptions, cuisineOptions);
      // getFoodRecipes();
    }
  });
}


function getFoodPrefScreen() {
  //This function will display the food preferences screen.
    $('.js-homeScreen').toggleClass('hidden');
    $('.js-foodPrefScreen').toggleClass('hidden');
};

function updatePreviousMealCalendar() {
  previousMealCalendar.length = 0;
  previousMealCalendar = currentMealCalendar.slice();
  currentMealCalendar.length = 0;
}

function changeMealCalendar() {
  $('.js-changeMealCalendarButton').on('click', function (event){
    event.preventDefault();
    
    getFoodPrefScreen();
    console.log("changecalendar working");
    updatePreviousMealCalendar();
  });
}

function startNewMealCalendar() {
  $('.js-newMealCalendar').on('click', function (event){
    event.preventDefault();
    $('input[type=checkbox]').each(function(){
      this.checked = false; 
    }); 
    getFoodPrefScreen();
    updatePreviousMealCalendar();
  });
}

function resetChangeMealCalendar() {
  $('.js-changeMealCalendarButton').on('click', function (event){
    event.preventDefault();
    $('input[type=checkbox]').each(function(){
      this.checked = false; 
    }); 
  });
}



function getFoodCategories(categories, area) {

  var recipes = [];
  var recipes2 = [];
  let catMealIds = [];
  let areaMealIds = [];
  // let totalMealIds = [];
  let foodRecipes = [];
  var promise1 = $(categories).each(function(index) {
    $.ajax({
      headers: {
        "accept": "application/json; odata=verbose"
      },
      type: 'GET',
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories[index]}`,
      success: (data) => {
        recipes.push(data);
        data.meals.forEach(function(obj){
          catMealIds.push(obj.idMeal);
          totalMealIds.push(obj.idMeal);
        });
        
        console.log("This is catmealid:" + catMealIds);
        console.log('foodrecipes:' + foodRecipes);
        return totalMealIds;
      },
      error: (error) => {
        console.log(error);
      }
    });
  });
  var promise2 = $(area).each(function(index) {
    console.log('cuisine recipes working');
        $.ajax({
          headers: {
            "accept": "application/json; odata=verbose"
          },
          type: 'GET',
          url: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area[index]}`,
          success: (data) => {
            recipes2.push(data);
            data.meals.forEach(function(obj){
              areaMealIds.push(obj.idMeal);
              totalMealIds.push(obj.idMeal);
            });
            
            console.log("This is areamealid:" + areaMealIds);
            console.log("This is totalmealid:" + totalMealIds);
            return totalMealIds;
          },
          error: (error) => {
            console.log(error);
          }
        });
    });
  var promise3 = $(totalMealIds).each(function(index) {
    $.ajax({
      headers: {
        "accept": "application/json; odata=verbose"
      },
      type: 'GET',
      url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${totalMealIds[index]}`,
      success: (data) => {
        foodRecipes.push(data);
        console.log('foodrecipes:' + foodRecipes);
      },
      error: (error) => {
        console.log(error);
      }
    });
  });

Promise.all([promise1, promise2]).then(function(values) {
  console.log('This is values' + values);
});
  // $(categories).each(function(index) {
  //   $.ajax({
  //     headers: {
  //       "accept": "application/json; odata=verbose"
  //     },
  //     type: 'GET',
  //     url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories[index]}`,
  //     success: (data) => {
  //       recipes.push(data);
  //       data.meals.forEach(function(obj){
  //         catMealIds.push(obj.idMeal);
  //         totalMealIds.push(obj.idMeal);
  //           // $.ajax({
  //           //   headers: {
  //           //     "accept": "application/json; odata=verbose"
  //           //   },
  //           //   type: 'GET',
  //           //   url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${obj.idMeal}`,
  //           //   success: (data) => {
  //           //     foodRecipes.push(data);
                
  //           //   },
  //           //   error: (error) => {
  //           //     console.log(error);
  //           //   }
  //           // });
          
  //       });
  //       console.log("This is catmealid:" + catMealIds);
  //       console.log('foodrecipes:' + foodRecipes);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   });
  // })
    // $(area).each(function(index) {
    //   console.log('cuisine recipes working');
    //       $.ajax({
    //         headers: {
    //           "accept": "application/json; odata=verbose"
    //         },
    //         type: 'GET',
    //         url: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area[index]}`,
    //         success: (data) => {
    //           recipes2.push(data);
    //           data.meals.forEach(function(obj){
    //             areaMealIds.push(obj.idMeal);
    //             totalMealIds.push(obj.idMeal);
    //           });
    //           console.log("This is areamealid:" + areaMealIds);
    //           console.log("This is totalmealid:" + totalMealIds);
    //         },
    //         error: (error) => {
    //           console.log(error);
    //         }
    //       });
    //   })
    // totalMealIds.forEach(function(index) {
    //     $.ajax({
    //       headers: {
    //         "accept": "application/json; odata=verbose"
    //       },
    //       type: 'GET',
    //       url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${totalMealIds[index]}`,
    //       success: (data) => {
    //         foodRecipes.push(data);
    //         console.log('foodrecipes:' + foodRecipes);
    //       },
    //       error: (error) => {
    //         console.log(error);
    //       }
    //     });
    //   })
      console.log('recipes working');
      console.log(recipes);
      console.log(recipes2);
      
      // getDailyRecipe(recipes, recipes2);
      // getMealIds(recipes, recipes2);
      // getFoodRecipes(totalMealIds);
    }

// function getFoodRecipes(mealIds) {

//       let foodRecipes = [];
      // console.log('mealids are:' + mealIds );
      // $(mealIds).each(function(index) {
      //   $.ajax({
      //     headers: {
      //       "accept": "application/json; odata=verbose"
      //     },
      //     type: 'GET',
      //     url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealIds[index]}`,
      //     success: (data) => {
      //       foodRecipes.push(data);
      //       console.log('foodrecipes:' + foodRecipes);
      //     },
      //     error: (error) => {
      //       console.log(error);
      //     }
      //   });
      // })
//           console.log('foodrecipes working' + foodRecipes);
//           console.log(foodRecipes);
//           // getDailyRecipe(recipes, recipes2);
//           // getMealIds(recipes, recipes2);
//         }

    // function getMealIds(category, cuisine) {
    //   console.log('getmeals working');
    //   $(category).each(function(index){
    //     console.log('working console');
    //     // console.log(category[index].meals.idMeal);
        
    //   })
    // }
    
    function getDailyRecipe(category, cuisine) {
      $(category).each(function(index){
        $(category[index]) = {
           "recipeTitle" : "",
           "recipeCategory" : "",
           "recipeIngredients" : "",
           "recipeImage" : "",
           "mealId" : "",
           "recipeCuisine" : "",
           "recipeInstructions" : "",
           "recipeThumbImage" : "",
           "recipeVideo" : ""
        }
      })
      $(cuisine).each(function(index){
        $(cuisine[index]) = {
           "recipeTitle" : "",
           "recipeCategory" : "",
           "recipeIngredients" : "",
           "recipeImage" : "",
           "mealId" : "",
           "recipeCuisine" : "",
           "recipeInstructions" : "",
           "recipeThumbImage" : "",
           "recipeVideo" : ""
        }
      })
    }
    

// function getFoodCuisines(area) {
//   // let baseUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
//   // // let foodCategoriesApi = '${baseUrl}${categorySelection}';
//   var recipes2 = [];
//   console.log('cuisine recipes working');
//   $(area).each(function(index) {
//     $.ajax({
//       headers: {
//         "accept": "application/json; odata=verbose"
//       },
//       type: 'GET',
//       url: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area[index]}`,
//       success: (data) => {
//         recipes2.push(data);
//       },
//       error: (error) => {
//         console.log(error);
//       }
//     });
//     console.log('cuisine recipes working');
//     console.log(recipes2);
// });
// }

function handleApp() {
  // foodPrefChecking();
  resetChangeMealCalendar();
  getHomeScreen();
  getExistingMealCalendar();
  changeMealCalendar();
  backToHome();
  getMealCalendarResults();
  startNewMealCalendar();
}

$(handleApp);
