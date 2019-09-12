//Storage Controller

//Item Conttroller
const ItemCtrl = (function () {
  //Item Constructor
  const Item = function (id, name, colories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Date Strucure /State
  const data = {
    items: [{
        id: 0,
        name: "Steak Dinner",
        calories: 1200
      },
      {
        id: 0,
        name: "Cookie",
        calories: 400
      },
      {
        id: 0,
        name: "Eggs",
        calories: 300
      }
    ],
    currentItem: null,
    totalCalories: 0
  }
  //Public Methods
  return {
    logData: function () {
      return data
    }
  }
})()



//UI Controller

const UiCtrl = (function () {

  //Public Methods
  return {

  }
})()



//App Controller
const App = (function (ItemCtrl, UiCtrl) {

  //Public methods
  return {
    init: function () {
      console.log("Initializing App ...")
    }
  }

})(ItemCtrl, UiCtrl);

//Initialize App
App.init()