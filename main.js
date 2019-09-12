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
    getItems: function(){
      return data.items;
    },
    logData: function () {
      return data
    }
  }
})()



//UI Controller

const UiCtrl = (function () {
  const UISelectors = {
    itemList: "#item-list"
  }

  //Public Methods
  return {
   populateItemList:function(items){
     let html ="";

     items.forEach(item => {
       html+= `<li class="collection-item" id="item-${item.id}">
       <strong>${item.name}: </strong><em>${item.calories} Calories</em>
       <a href="#" class="secondary-content">
         <i class="edit-item fa fa-pencil"></i>
       </a>
     </li>`
     });

     //Insert list Items
     document.querySelector(UISelectors.itemList).innerHTML = html;
   }

  }
})()



//App Controller
const App = (function (ItemCtrl, UiCtrl) {

  //Public methods
  return {
    init: function () {
    
      //Fetch Items from data structor
      const items = ItemCtrl.getItems();

      //Populate list with Items
      UiCtrl.populateItemList(items);
     
    }
  }

})(ItemCtrl, UiCtrl);

//Initialize App
App.init()