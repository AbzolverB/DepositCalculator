const form = document.querySelector("#form");
const depositType = document.querySelector("#depositType");
const depositTime = document.querySelector("#depositTime");
const depositSum = document.querySelector("#depositSum");
const result = document.querySelector("#result");

const createOptions = (terms) => (
        terms.map((term) => {
        const option = document.createElement("option");
        option.value = term;
        option.text = term === 3 ? '3 месяца' :
        term === 6 ? '6 месяцев' : term === 9 ? '9 месяцев' : term === 12 ? '1 год' :
        `${term / 12} года`;
        return option;
        })
);

const onDepositTypeChange = (e) => {
    let options;
    depositTime.innerHTML = '';
    switch(depositType.value) {
        case("replentishable"):
        options = createOptions([6, 12, 18, 24]);
        for(let opt of options) {
            depositTime.options.add(opt);
        }
        break;
        case("urgent"):
        options = createOptions([3, 6, 9, 12, 18, 24]);
        for(let opt of options) {
            depositTime.options.add(opt);
        }
        break;
    default:
        break;
    }
};

const calculateTotalSumReturn = (sum, term, depositType) => {
    let result;
    if(depositType === "replentishable") {
    switch(term) {
        case(6):
            result = sum * 0.2; 
            break;
        case(12):
            result = sum * 0.22;
            break;
        case(18):
            result = sum * 0.15;
            break;
        case(24):
            result = sum * 0.1;
            break;
        }
    } else if(depositType === "urgent") {
            switch(term) {
        case(3):
            result = sum * 0.2; 
            break;
        case(6):
            result = sum * 0.22;
            break;
	    case(9):
	        result = sum * 0.23;
            break;
	    case(12):
            result = sum * 0.24;
            break;
        case(18):
            result = sum * 0.18;
            break;
	    case(24):
            result = sum * 0.15;
            break;
        }
    };
    result = (result * (term / 12)) + sum
    
    return result;
}

const checkIsDepositTypeSelected = () => {
    if(depositType.value !== "replentishable" && depositType.value !== "urgent") alert("Выберите тип вклада");
}

const formatToRubles = (num) => Intl.NumberFormat('Ru-ru', { style: 'currency', currency: 'RUB' }).format(num);

const onFormSubmit = (e) => {
    e.preventDefault();
    const total = calculateTotalSumReturn(+depositSum.value, +depositTime.value, depositType.value);
    const depositName = depositType.options[depositType.selectedIndex].text;
    const depositTimeText = depositTime.options[depositTime.selectedIndex].text;
    result.innerText = `
        Вклад "${depositName}" на срок "${depositTimeText}" на сумму ${formatToRubles(+depositSum.value)}
    
        В конце срока вы получите ${formatToRubles(+total)}
    `
}

depositType.addEventListener("change", onDepositTypeChange);
form.addEventListener("submit", onFormSubmit);
depositTime.addEventListener("mousedown", checkIsDepositTypeSelected);