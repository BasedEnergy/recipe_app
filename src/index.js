import React from "react";
import ReactDOM from "react-dom";
import './index.css';

const DirectoryView = props => (
  <section>
    <div id={'search'}>
      <SearchForm searchVal={props.searchVal} handleChange={props.handleChange} selectRecipes={props.selectRecipes} />
      <ul id={'results'}>
        {props.selectedRecipes.map(recipe => (
          <RecipeCard name={recipe.name} id={recipe.id} selectDetail={props.selectDetail} />
        ))}
      </ul>
    </div>
    <DetailView detailRecipe={props.detailRecipe}/>
  </section>
);

const SearchForm = props => (
  <form>
    <input value={props.searchVal} onChange={props.handleChange} />
    <button onClick={props.selectRecipes}>Search</button>
  </form>
);

const RecipeCard = props => (
  <li className={'card'} onClick={(e)=>props.selectDetail(e,props.id)}>
    <p>{props.name}</p>
  </li>
);

const DetailView = props => (
  <article>
    <h1>{props.detailRecipe.name.toUpperCase()}</h1>
    <div className={'details'}>
      <div id={'ingredients'}>
        <h5>INGREDIENTS</h5>
        <ul>
          {props.detailRecipe.ingredients.map(ingredient => (
            <li>
              <p>{ingredient}</p>
            </li>
          ))}
        </ul>
      </div>
      <div id={'instructions'}>
        <h5>INSTRUCTIONS</h5>
        <ul>
          {props.detailRecipe.instructions.map(instruction => (
              <li>
                <p>{instruction}</p>
              </li>
          ))}
        </ul>
      </div>
    </div>
  </article>
);

class App extends React.Component {
  state = {
    recipes: [
      {
        id: 1,
        name: "lettuce salad",
        ingredients: ["lettuce", "more lettuce"],
        instructions: ["start with lettuce", "sprinkle lettuce on top"]
      },
      {
        id: 2,
        name: "tuna salad",
        ingredients: ["tuna", "mayo"],
        instructions: ["empty tuna into bowl", "mix with mayonnaise"]
      },
      {
        id: 3,
        name: "tofurkey sandwich",
        ingredients: ["bread", "tofurkey", "mayo"],
        instructions: ["put tofurkey on bread", "spread mayo", "close bread"]
      },
      {
        id: 4,
        name: "hummus",
        ingredients: ["chickpeas", "cumin"],
        instructions: ["mash chickpeas", "stir in cumin"]
      },
      {
        id: 5,
        name: "chocolate pops",
        ingredients: ["chocolate almond milk", "stick"],
        instructions: [
          "pour almond milk into freezer tray with sticks",
          "freeze"
        ]
      },
      {
        id: 6,
        name: "cereal",
        ingredients: ["cereal", "almond milk"],
        instructions: ["pour cereal into bowl", "add milk"]
      },
      {
        id: 7,
        name: "ramen noodles",
        ingredients: ["noodles", "seasoning"],
        instructions: ["bowl noodles till soft", "add seasoning"]
      },
      {
        id: 8,
        name: "spaghetti",
        ingredients: ["noodles", "tomato sauce"],
        instructions: ["cook noodles until Al Dente", "stir in tomato sauce"]
      },
      {
        id: 9,
        name: "brownies",
        ingredients: ["brownie mix", "magic butter", "flegg"],
        instructions: [
          "mix brownie mix, magic butter, and flegg",
          "bake until brownie"
        ]
      },
      {
        id: 10,
        name: "stir-fry",
        ingredients: ["veggies", "tofu", "oil"],
        instructions: ["sear tofu", "cook veggies in oil", "mix"]
      }
    ],
    searchVal: '',
    selectedRecipes: [],
    detailRecipe: {
      id: -1,
      name: "",
      ingredients: [],
      instructions: []
    }
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ searchVal: event.target.value});
  }

  selectRecipes = event => {
    event.preventDefault();
    const selects = this.state.recipes.filter(recipe => recipe.name.includes(this.state.searchVal));
    this.setState({selectedRecipes: selects});
  }

  selectDetail = (event, id) => {
    event.preventDefault();
    const recipe = this.state.recipes.find(recipe => recipe.id === id)
    this.setState({detailRecipe: recipe})
  }

  //Executed after render() finishes
  componentDidMount() {
    //Initializes page will all recipes
    this.setState({ selectedRecipes: this.state.recipes });
    this.setState({detailRecipe: this.state.recipes[0]})
  }

  render() {
    return (
      <DirectoryView
        selectedRecipes={this.state.selectedRecipes}
        searchVal={this.state.searchVal}
        detailRecipe={this.state.detailRecipe}
        handleChange={this.handleChange}
        selectRecipes={this.selectRecipes}
        selectDetail={this.selectDetail}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
