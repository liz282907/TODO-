define('store',['vue','vuex'],function(Vue,Vuex){

	Vue.use(Vuex);

	function createDefaultTodo(value){
		return {
			content:value,
			checked:false,
			show:false,
			noEdit:true
		}
	}


	var store = new Vuex.Store({
		state:{
			todos:[]
		},
		mutations:{
			addTodo(state,inputStr){
				var todo = createDefaultTodo(inputStr);
				state.todos.push(todo);
			},
			deleteTodo(state,index){
				state.todos.splice(index,1);
			},
			changeToEdit(state,index){
				state.todos[index].noEdit = false;
			},
			updateTodo(state,{todo,index,value}){
				console.log("todo",todo);
				state.todos[index].noEdit = false;
			},
			deleteSelected(state,indexArr){
				// var that = this;
				// indexArr.forEach(function(index){
				// 	this.deleteTodo(state,index);
				// })
				state.todos = state.todos.filter(function(todo,index){
					return (indexArr.indexOf(index)===-1)
				});
			},
			checkAll(state,payload){
				state.todos.forEach(function(todo){
					todo.checked = payload.checkState;
				})
			}

		}
	});

	return store;

})

