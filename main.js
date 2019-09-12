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
    items: [
      // {
      //   id: 0,
      //   name: "Steak Dinner",
      //   calories: 1200
      // },
      // {
      //   id: 0,
      //   name: "Cookie",
      //   calories: 400
      // },
      // {
      //   id: 0,
      //   name: "Eggs",
      //   calories: 300
      // }
    ],
    currentItem: null,
    totalCalories: 0
  }
  //Public Methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let ID;
      //Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Calories to number
      calories = parseInt(calories);

      //Create a new Item
      newItem = new Item(ID, name, calories);

      //add to new item array
      data.items.push(newItem);

      return newItem;

    },
    getItemById: function (id) {
      let found = null;
      //Loop through item
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found
    },
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
    getTotalCalories: function () {
      let total = 0;

      //Loop trought items and add cals
      data.items.forEach(function (item) {
        total += item.calories;
        //total = total +item.calories;
      })
      //Set total cal in data structure
      data.totalCalories = total;

      //Retun total
      return data.totalCalories;
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
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',

  }

  //Public Methods
  return {
    populateItemList: function (items) {
      let html = "";

      items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">
       <strong>${item.name}: </strong><em>${item.calories} Calories</em>
       <a href="#" class="secondary-content">
         <i class="edit-item fa fa-pencil"></i>
       </a>
     </li>`
      });

      //Insert list Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function (item) {
      //Show the list 
      document.querySelector(UISelectors.itemList).style.display = "block";
      //Create li element
      const li = document.createElement('li');
      //Add calss
      li.className = 'collection-item';
      //Add ID
      li.id = `item-${item.id}`;
      //Add html
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} 
      Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`
      //Insert Item
      document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li)
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UiCtrl.showEditState();
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function (total) {
      document.querySelector(UISelectors.totalCalories).textContent = total;
    },
    clearEditState: function () {
      UiCtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    getSelectors: function () {
      return UISelectors;
    }

  }
})()



//App Controller
const App = (function (ItemCtrl, UiCtrl) {

  //Load event Listeners
  const loadEventListeners = function () {
    //Get Ui Selector
    const UISelectors = UiCtrl.getSelectors();

    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)

    //Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener("click", itemUpdateSubmit);
  }

  //Add item submit
  const itemAddSubmit = function (e) {
    //Get for input from UI Controler
    const input = UiCtrl.getItemInput();
    //Check for name and calorie input
    if (input.name !== "" && input.calories !== "") {
      //add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      //Add Item to UI list
      UiCtrl.addListItem(newItem)

      //Get total Calories
      const totalCalories = ItemCtrl.getTotalCalories()

      //Add total calories to UI
      UiCtrl.showTotalCalories(totalCalories);
      //clear fields
      UiCtrl.clearInput()
    }
    e.preventDefault()
  }

  //Update item submit
  const itemUpdateSubmit = function (e) {
    if (e.target.classList.contains("edit-item")) {

      //Get the list item id(item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      //Breat into an array
      const listIdArr = listId.split("-");

      //Get the actual id
      const id = parseInt(listIdArr[1])

      //Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      //Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      //Add item to form
      UiCtrl.addItemToForm()
    }
    e.preventDefault()
  }


  //Public methods
  return {
    init: function () {
      // Clear edit state / sset initial set
      UiCtrl.clearEditState();

      //Fetch Items from data structor
      const items = ItemCtrl.getItems();

      //Chech if any Items
      if (items.length === 0) {
        UiCtrl.hideList();
      } else {
        //Populate list with Items
        UiCtrl.populateItemList(items);
      }

      //Get total Calories
      const totalCalories = ItemCtrl.getTotalCalories()

      //Add total calories to UI
      UiCtrl.showTotalCalories(totalCalories);


      //LoadEventListeners();
      loadEventListeners();

    }
  }

})(ItemCtrl, UiCtrl);

//Initialize App
App.init()