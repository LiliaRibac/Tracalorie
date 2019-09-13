//Storage Controller
const StorageCtrl = (function () {
  //Public methods
  return {
    storeItem: function (item) {
      let items ;
      //Ckeck if any items in LS
      if (localStorage.getItem("items") === null) {
        items = [];
        //Push new Item
        items.push(item);
        //set ls
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        //Get what is already in LS
        items = JSON.parse(localStorage.getItem("items"));

        //Push new Item
        items.push(item);

        //Res set LS
        localStorage.setItem("items", JSON.stringify(items))
      }
    },
    getItemFromStorage: function () {
      let items;
      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }
      return items;
    }
  }
})()

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
   // items: [
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
   // ],
   items:StorageCtrl.getItemFromStorage(),
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
    updateItem: function (name, calories) {
      //Calories to number
      calories = parseInt(calories);

      let found = null;

      //Loop through item
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      })
      return found;

    },
    deleteItem: function (id) {
      //get ids
      const ids = data.items.map(function (item) {
        return item.id;
      })

      //get index
      const index = ids.indexOf(id);

      //Remove item
      data.items.splice(index, 1);
    },
    clearAllItems: function () {
      data.items = []
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
    listItems: '#item-list li',
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
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
    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function (listItem) {

        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} 
          Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`
        }
      })

    },
    deleteListItem: function (id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove()
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
    removeItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //Turn Node list into array
      listItems = Array.from(listItems);
      listItems.forEach(function (item) {
        item.remove();
      })
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
const App = (function (ItemCtrl, StorageCtrl, UiCtrl) {

  //Load event Listeners
  const loadEventListeners = function () {
    //Get Ui Selector
    const UISelectors = UiCtrl.getSelectors();

    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    //Disable submit on enter
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    })
    //Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener("click", itemEditClick);

    //Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener("click", itemUpdateSubmit);

    //Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener("click", itemDeleteSubmit);

    //Back button event
    document.querySelector(UISelectors.backBtn).addEventListener("click", UiCtrl.clearEditState);

    //Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener("click", clearAllItemsClick);
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

      //Store in LocalStorage
      StorageCtrl.storeItem(newItem);

      //clear fields
      UiCtrl.clearInput()
    }
    e.preventDefault()
  }

  //Click edit item
  const itemEditClick = function (e) {
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

  //Update item submit
  const itemUpdateSubmit = function (e) {

    //Get item input
    const input = UiCtrl.getItemInput();

    //Update item
    const updateItem = ItemCtrl.updateItem(input.name, input.calories)

    //Update UI
    UiCtrl.updateListItem(updateItem)

    //Get total Calories
    const totalCalories = ItemCtrl.getTotalCalories()

    //Add total calories to UI
    UiCtrl.showTotalCalories(totalCalories);

    UiCtrl.clearEditState();

    e.preventDefault()
  }

  //Delete button submit
  const itemDeleteSubmit = function (e) {

    //Get curent item
    const currentItem = ItemCtrl.getCurrentItem();

    //Delete from data strucure
    ItemCtrl.deleteItem(currentItem.id);

    //  Delete from UI
    UiCtrl.deleteListItem(currentItem.id);

    //Get total Calories
    const totalCalories = ItemCtrl.getTotalCalories()

    //Add total calories to UI
    UiCtrl.showTotalCalories(totalCalories);

    UiCtrl.clearEditState();

    e.preventDefault()
  }

  //Clear items event
  const clearAllItemsClick = function () {

    //Delete all items from data structore
    ItemCtrl.clearAllItems()

    //Get total Calories
    const totalCalories = ItemCtrl.getTotalCalories()

    //Add total calories to UI
    UiCtrl.showTotalCalories(totalCalories);

    //Remove from UI
    UiCtrl.removeItems();

    //Hide UL
    UiCtrl.hideList();
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

})(ItemCtrl, StorageCtrl, UiCtrl);

//Initialize App
App.init()