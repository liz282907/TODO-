/**
* Q：mouseover的时候执行多次
*/

(function(){

	var todoList = new Vue({
		el:"#item_lists",
		data:{
			todos:[],
		},
		methods:{
			showDeleteBtn:function(index,event){
				event.stopPropagation();
				if(event.currentTarget.className!=="user_choice_item")
					return;

				this.todos[index].show = true;
			},
			hideDeleteBtn:function(index,event){
				this.todos[index].show = false;
			},
			deleteTodo:function(index){

				this.todos.splice(index,1);
				// return false;
			},
			changeToEdit:function(index){
				this.todos[index].noEdit = false;
				this.todos[index].show = false;

			},
			doneEdit:function(index){
				var tempMsg = this.todos[index].tempMsg;

				this.todos[index].content = tempMsg;
				this.todos[index].noEdit = true;
			}



		}
	});

	var checkAllInput = new Vue({
		el:"#checkAll",
		// data:{
		// 	allChecked:false
		// },
		computed:{
			allChecked:{
				get:function(){
					return todoList.todos.length>0 && todoList.todos.every(function(todo){
						return todo.checked;
					});
				},
				set:function(value){

					todoList.todos.forEach(function(todo,index){
						todo.checked = value;
					});

				}
			}
		},

	});

	var bottom = new Vue({
		el:"#bottom",
		computed:{
			selectedNum:function(){
				return todoList.todos.filter(function(todo){
							return todo.checked;
						}).length
			},
			selectedItems:function(){
				var indexArr = [];
				todoList.todos.filter(function(todo,index){
					if(todo.checked) indexArr.push(index);
				});
				return indexArr;
			},
		},
		methods:{
			deleteSelected:function(){
				var indexArr = this.selectedItems;
				todoList.todos = todoList.todos.filter(function(todo,index){
					return (indexArr.indexOf(index)===-1)
				});
			}
		}
	})


	var todoInput = new Vue({
		el:".input_text",
		data:{
			message:""
		},
		methods:{
			createTodo:function(event){
				//this.message
				var value = createDefaultTodo(this.message);
				todoList.todos.push(value);
				this.message = "";

				// console.log(todoList.todos.map(function(todo){return todo.checked?"true":"false"}));
			}
		}
	});

	function createDefaultTodo(value){
		return {
			content:value,
			checked:false,
			show:false,
			noEdit:true
		}
	}

	function changeAttrInObj(obj,attr,value){
		return Object.assign({},obj,{[attr]:value});
	}



})();