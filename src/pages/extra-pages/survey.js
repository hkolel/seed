import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import MainCard from "components/MainCard";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
formControl: {
margin: theme.spacing(1),
minWidth: 150,
},
container: {
display: "flex",
alignItems: "center",
justifyContent: "center",

},
questionButton: {
    marginLeft: "85%",
},
leftContainer: {
width: "40%",
},
rightContainer: {
width: "60%",
},
wideTextField: {
    width: '90%',
    marginBottom:'10%'
},
questionContainer: {
border: "1px solid gray",
padding: "10px",
margin: "10px",
},
optionContainer: {
display: "flex",
alignItems: "center",
}
}));

const Survey = () => {
const classes = useStyles();
const [surveyTitle, setSurveyTitle] = useState("");
const [questionType, setQuestionType] = useState("text");
const [questionList, setQuestionList] = useState([]);

const handleSurveyTitleChange = (event) => {
setSurveyTitle(event.target.value);
};

const handleQuestionTypeChange = (event) => {
setQuestionType(event.target.value);
};

const handleQuestionAdd = () => {
setQuestionList([...questionList, { type: questionType, text: "", answerType: "", options: [] }]);
};

const handleQuestionTextChange = (index, event) => {
const newQuestionList = [...questionList];
newQuestionList[index].text = event.target.value;
setQuestionList(newQuestionList);
};

const handleAnswerTypeChange = (index, event) => {
const newQuestionList = [...questionList];
newQuestionList[index].answerType = event.target.value;
setQuestionList(newQuestionList);
};

const handleOptionAdd = (index) => {
const newQuestionList = [...questionList];
newQuestionList[index].options.push("");
setQuestionList(newQuestionList);
};

const handleOptionChange = (questionIndex, optionIndex, event) => {
const newQuestionList = [...questionList];
newQuestionList[questionIndex].options[optionIndex] = event.target.value;
setQuestionList(newQuestionList);
};

const handleOptionRemove = (questionIndex, optionIndex) => {
const newQuestionList = [...questionList];
newQuestionList[questionIndex].options.splice(optionIndex, 1);
setQuestionList(newQuestionList);
};

const handleQuestionRemove = (index) => {
const newQuestionList = [...questionList];
newQuestionList.splice(index, 1);
setQuestionList(newQuestionList);
};
const handleCheckboxChange = (index, event) => {
    const newQuestionList = [...questionList];
    newQuestionList[index].checked = event.target.checked;
    setQuestionList(newQuestionList);
    };

return (
<MainCard title="Anket">
<Grid container className={classes.container}>
<Grid item className={classes.leftContainer}>
<form>
<TextField
       label="Anket Başlığı"
       value={surveyTitle}
       onChange={handleSurveyTitleChange}
       className={classes.wideTextField}
     />
<br />
<FormControl className={classes.formControl}>
<InputLabel id="question-type-label">Soru Türü</InputLabel>
<Select
         labelId="question-type-label"
         id="question-type-select"
         value={questionType}
         onChange={handleQuestionTypeChange}
       >
<MenuItem value={"text"}>Metin</MenuItem>
<MenuItem value={"multipleChoice"}>Çoktan Seçmeli</MenuItem>
<MenuItem value={"checkbox"}>Onay Kutusu</MenuItem>
</Select>
</FormControl>
<br />
<FormControl className={classes.formControl} hidden={questionType!=="multipleChoice"}>
<InputLabel id="answer-type-label">Cevap Türü</InputLabel>
<Select
labelId="answer-type-label"
id="answer-type-select"
value={questionType === "multipleChoice" ? questionList[questionList.length - 1].answerType : ""}
onChange={(event) => handleAnswerTypeChange(questionList.length - 1, event)}
>
<MenuItem value={"single"}>Tekli</MenuItem>
<MenuItem value={"multiple"}>Çoklu</MenuItem>
</Select>
</FormControl>
<br />
<Button variant="contained" color="primary" onClick={handleQuestionAdd}>
Soru Ekle
</Button>
</form>
</Grid>
<Grid item className={classes.rightContainer}>
{questionList.map((question, index) => (
<div key={index} className={classes.questionContainer}>
<TextField 
//label={'Soru ${index + 1}'}
value={question.text}
onChange={(event) => handleQuestionTextChange(index, event)}
className={classes.wideTextField}
/>
{question.type === "multipleChoice" && (
<div>
{question.options.map((option, optionIndex) => (
<div key={optionIndex} className={classes.optionContainer}>
<TextField
//label={'Seçenek ${optionIndex + 1}'}
value={option}
onChange={(event) => handleOptionChange(index, optionIndex, event)}
/>
<Button
variant="contained"
color="secondary"
onClick={() => handleOptionRemove(index, optionIndex)}
>
Seçenek Sil
</Button>
</div>
))}
<Button  variant="contained" color="primary" onClick={() => handleOptionAdd(index)}>
Seçenek Ekle
</Button>
</div>
)}
{question.type === "checkbox" && (

<div>
  <Checkbox
    checked={question.checked}
    onChange={(event) => handleCheckboxChange(index, event)}
  />
</div>
)}
<Button className={classes.questionButton} variant="contained" color="secondary" onClick={() => handleQuestionRemove(index)}>
Soru Sil
</Button>
</div>
))}
</Grid>
</Grid>
</MainCard>
);
};

export default Survey;