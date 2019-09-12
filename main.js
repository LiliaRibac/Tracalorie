//Storage Controller

//Item Conttroller
const ItemCtrl = (function () {
  //Item Constructor
  const Item = function (id, name, calories) {
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
    addItem: function(name, calories){
      let ID;
      //Create ID
      if(data.items.length > 0){
        ID =data.items[data.items.length -1].id +1;
      }else{
        ID = 0;
      }

      //Calories to number
      calories =parseInt(calories);

      //Create a new Item
      newItem = new Item(ID, name, calories);

      //add to new item array
      data.items.push(newItem);

      return newItem;

    },
    logData: function () {
      return data
    }
  }
})()



//UI Controller

const UiCtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
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
   },
   getItemInput: function(){
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
   },
   getSelectors: function(){
     return UISelectors;
   }

  }
})()



//App Controller
const App = (function (ItemCtrl, UiCtrl) {

  //Load event Listeners
  const loadEventListeners = function (){
    //Get Ui Selector
     const UISelectors = UiCtrl.getSelectors();

     //Add item event
     document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
  }

  //Add item submit
  const itemAddSubmit = function(e){
  //Get for input from UI Controler
    const input = UiCtrl.getItemInput();
  //Check for name and calorie input
  if(input.name !== "" && input.calories !== ""){
    //add item
    const newItem  = ItemCtrl.addItem(input.name, input.calories)

  }
    e.preventDefault()
  }



  //Public methods
  return {
    init: function () {
    
      //Fetch Items from data structor
      const items = ItemCtrl.getItems();

      //Populate list with Items
      UiCtrl.populateItemList(items);

      //LoadEventListeners();
      loadEventListeners();
     
    }
  }

})(ItemCtrl, UiCtrl);

//Initialize App
App.init()