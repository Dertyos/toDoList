import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { ToDo } from "./todo.jsx";
//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<ToDo />
		</div>
	);
};

export default Home;
