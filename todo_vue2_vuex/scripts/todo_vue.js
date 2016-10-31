require.config({
	paths:{
		vue: './vue',
		vuex: './vuex',
		store: './store'
	}
});
require(['vue','store'],function(Vue,store){
	var todoList = new Vue({
		el:"#item_lists",
		computed:{
			todos(){
				return store.state.todos
			}
		},
		methods:{
			deleteTodo:function(index){
				store.commit('deleteTodo',index);
			},
			changeToEdit:function(index){
				store.commit('changeToEdit',index);
			},
			doneEdit:function(todo,index){
				// store.commit('updateTodo',{todo,index,$event.target.value});
			}



		}
	});

	var checkAllInput = new Vue({
		el:"#checkAll",
		computed:{
			allChecked:{
				get:function(){
					return todoList.todos.length>0 && todoList.todos.every(function(todo){
						return todo.checked;
					});
				},
				set:function(value){
					store.commit("checkAll",{checkState:value});
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
				store.commit("deleteSelected",indexArr);
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
				store.commit('addTodo',this.message);
				this.message = "";
			}
		}
	});

	function changeAttrInObj(obj,attr,value){
		return Object.assign({},obj,{[attr]:value});
	}



});