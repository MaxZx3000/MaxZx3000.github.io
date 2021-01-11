class Formatter {
    getIndividualDates(fullTextDate){
        let date = new Date(fullTextDate); 
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        return [year, month, day];
    }
    getYYYYMMDDString(fullDate){
        let date = new Date(fullDate);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        if (month < 10){
            month = `0${month}`;
        }
        let day = date.getDate();
        if (day < 10){
            day = `0${day}`;
        }
        return `${year}-${month}-${day}`;
    }
    getAddedDateString(dateToBeAdded, amount){
        let newDate = new Date(dateToBeAdded);
        newDate.setDate(newDate.getDate() + amount);
        return `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`;
    }
    getConstraintValue(data){
        if (data === undefined || data === null){
            return "No data";
        }
        return data;
    }
    getNamedMonth(monthInNumber){
        const month =  ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
        return month[monthInNumber];
    }
    getHumanReadableDate(date){
        let newDate = new Date(date);
        return `${newDate.getDate()} ${this.getNamedMonth(newDate.getMonth())} ${newDate.getFullYear()}`;
    }
    getDateOnly(fullTextDate){
        return fullTextDate.split('T')[0];
    }
    getSentenceCase(text){
        let loweredCaseText = text.toLowerCase();
        let substring = loweredCaseText.substr(1, loweredCaseText.length-1);
        let firstLetter = loweredCaseText.charAt(0).toUpperCase();
        let finalText = (firstLetter) + substring;
        return finalText;
    }
    getCapitalizedSentence(text, splitter){
        let splittedTexts = text.split(splitter);
        let finalText = "";
        splittedTexts.forEach((splittedText) => {  
            let firstLetter = splittedText.charAt(0).toUpperCase();
            let substring = firstLetter + splittedText.substr(1, splittedText.length - 1).toLowerCase();
            finalText += substring + " "
        })
        return finalText;
    }
}
export default Formatter;