var $ = require('jquery');
import { List } from 'immutable';

module.exports = {
  setTodos: function (todos) {
    if ($.isArray(todos)) {
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    }
  },
  getTodos: function () {
    var stringTodos = localStorage.getItem('todos');
    //var todos = [];
    var todos;

    try {
      //todos = JSON.parse(stringTodos);
      todos = List(JSON.parse(stringTodos));//List(JSON.parse(stringTodos));
    } catch (e) {
    }

    //return $.isArray(todos) ? todos : [];
    return List.isList(todos) ? todos : List();
  },
  filterTodos: function (todos, showCompleted, searchText) {
    //var filteredTodos = todos;
    var filteredTodos = todos.filter(todo => {
      // Filter by showCompleted
      return !todo.completed || showCompleted;
    }).filter((todo) => {
      // Filter by searchText
      var text = todo.text.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) > -1;
    }).sort((a, b) => {
      // Sort todos with non-completed first
      if (!a.completed && b.completed) {
        return -1;
      } else if (a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }
    });
    /*
    // Filter by showCompleted
    filteredTodos = todos.filter((todo) => {
      return !todo.completed || showCompleted;
    });
    debugger;
    // Filter by searchText
    filteredTodos = filteredTodos.filter((todo) => {
      debugger;
      var text = todo.text.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) > -1;
    });

    // Sort todos with non-completed first
    filteredTodos.sort((a, b) => {
      if (!a.completed && b.completed) {
        return -1;
      } else if (a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }
    });*/

    return filteredTodos;
  }
};
