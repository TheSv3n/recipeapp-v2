import React, { useState, useEffect } from "react";
import TempIngredient from "../components/TempIngredient";
import TempTag from "../components/TempTag";
import Loader from "../components/Loader";
import axios from "axios";
import "../css/NewRecipeScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../actions/recipeActions";
import { RECIPE_CREATE_RESET } from "../constants/recipeConstants";
import { updatePageHeading } from "../actions/navBarActions";
import Meta from "../components/Meta";

const NewRecipeScreen = ({ history }) => {
  const titleString = "Create Recipe";
  const dispatch = useDispatch();

  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tagArray, setTagArray] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [directions, setDirections] = useState("");
  const [ingredientArray, setIngredientArray] = useState([]);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageName, setImageName] = useState("No Image");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recipeCreate = useSelector((state) => state.recipeCreate);
  const { success, loading, recipe } = recipeCreate;

  const handleNewRecipe = (e) => {
    e.preventDefault();
    dispatch(
      createRecipe({
        name: recipeName,
        description: recipeDescription,
        directions: directions,
        ingredients: ingredientArray,
        tags: tagArray,
        image: image,
      })
    );
  };

  const addTempIngredient = (e) => {
    e.preventDefault();
    if (ingredientName !== "") {
      let tempIngredient = {
        name: ingredientName,
        nameLower: ingredientName.toLowerCase(),
        quantity: ingredientQuantity,
      };
      let tempIngredients = [...ingredientArray, tempIngredient];
      setIngredientArray(tempIngredients);
      setIngredientName("");
      setIngredientQuantity("");
    }
  };

  const removeTempIngredient = (index) => {
    let tempIngredients = [...ingredientArray];
    tempIngredients.splice(index, 1);
    setIngredientArray(tempIngredients);
  };

  const addTempTag = (e) => {
    e.preventDefault();
    if (tag !== "") {
      let tempTag = {
        tag: tag,
        tagLower: tag.toLowerCase(),
      };
      let tempTags = [...tagArray, tempTag];
      setTagArray(tempTags);
      setTag("");
    }
  };

  const removeTempTag = (index) => {
    let tempTags = [...tagArray];
    tempTags.splice(index, 1);
    setTagArray(tempTags);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "mutipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
      setImageName(e.target.value);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const clearImageHandler = () => {
    document.getElementById("image-form").value = "";
    setImageName("No Image");
    setImage("");
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (success) {
      dispatch({ type: RECIPE_CREATE_RESET });
      history.push(`/recipe/${recipe._id}`);
    }
    dispatch(updatePageHeading(titleString));
  }, [dispatch, history, userInfo, success, recipe]);

  return (
    <>
      <Meta title={titleString} />
      <div className="container">
        <div className="row">
          <div className="col-12 mx-auto col-md-12 col-lg-12">
            <ul className="list-group">
              <li className="list-group-item my-1 my-md-2 my-lg-2 mx-2">
                <form>
                  <div className="row">
                    <div className="input-group col-12  my-1 mr-auto">
                      <div className="input-group-prepend">
                        <div className="input-group-text text-white">
                          <i className="fas fa-utensils" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Recipe Name"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-group col-12  my-1 mr-auto">
                      <div className="input-group-prepend">
                        <div className="input-group-text text-white">
                          <i className="fas fa-info-circle" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={recipeDescription}
                        onChange={(e) => setRecipeDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-group col-7 col-md-4 my-1">
                      <div className="input-group-prepend">
                        <div className="input-group-text text-white">
                          <i className="fas fa-tag" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                      />
                      <button
                        className="btn input-button col-4 ml-auto"
                        onClick={addTempTag}
                      >
                        <span className="d-none d-lg-block">Add Tag</span>
                        <span className="d-lg-none">
                          <i className="fas fa-plus" />
                        </span>
                      </button>
                    </div>
                    <div className="new-tag-grid">
                      {tagArray.map((tag) => {
                        return (
                          <TempTag
                            key={tagArray.indexOf(tag)}
                            index={tagArray.indexOf(tag)}
                            tag={tag}
                            removeTempTag={removeTempTag}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-group col-7  my-1">
                      <div className="input-group-prepend">
                        <div className="input-group-text text-white">
                          <i className="fas fa-pepper-hot" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingredient"
                        value={ingredientName}
                        onChange={(e) => setIngredientName(e.target.value)}
                      />
                    </div>
                    <div className="input-group col-5  my-1">
                      <div className="input-group-prepend">
                        <div className="input-group-text text-white">
                          <i className="fas fa-balance-scale" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Quantity"
                        value={ingredientQuantity}
                        onChange={(e) => setIngredientQuantity(e.target.value)}
                      />
                      <button
                        className="btn input-button col-5 ml-auto d-none d-lg-block"
                        onClick={addTempIngredient}
                      >
                        <span className="d-none d-lg-block">
                          Add Ingredient
                        </span>
                        <span className="d-lg-none">
                          <i className="fas fa-plus" />
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="row d-lg-none d-block">
                    <button
                      className="btn submit-button mx-3 col-6 mx-auto"
                      onClick={addTempIngredient}
                    >
                      Add ingredient
                    </button>
                  </div>
                  {ingredientArray.map((ingredient) => {
                    return (
                      <TempIngredient
                        key={ingredientArray.indexOf(ingredient)}
                        index={ingredientArray.indexOf(ingredient)}
                        ingredient={ingredient}
                        removeTempIngredient={removeTempIngredient}
                      />
                    );
                  })}
                  <div className="row">
                    <div className="input-group col-12  my-1 mr-auto">
                      <textarea
                        type="text"
                        className="form-control recipe-area"
                        placeholder="Directions"
                        value={directions}
                        onChange={(e) => setDirections(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row d-block my-2">
                    <div className="input-group col-12 ">
                      <label for="image-form" className="mr-1 my-auto">
                        <i className="fas fa-image" /> Add Image
                      </label>
                      <input
                        id="image-form"
                        type="file"
                        className="form-file"
                        onChange={uploadFileHandler}
                      />
                      {uploading ? (
                        <Loader />
                      ) : (
                        <div className="d-flex col-6 col-md-3 my-auto">
                          <div className="d-none d-md-flex d-lg-flex">
                            {imageName}
                          </div>
                          {image === "" ? (
                            ""
                          ) : (
                            <button
                              className="btn btn-block submit-button ml-2"
                              onClick={clearImageHandler}
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="row">
                      <button
                        className="btn submit-button mx-3 col-11 mx-auto"
                        onClick={handleNewRecipe}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewRecipeScreen;
