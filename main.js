//Accordeon component 
let accordionTogglers = document.querySelectorAll(".accordion-item-toggler");
accordionTogglers.forEach(function (toggler) {
    toggler.addEventListener("click", function (e) {
        let accordionBody = e.target.nextElementSibling;
        // accordionBody.classList.toggle("collapse"); // css bilan (js inline style) uncha chiqishmas ekan
        if (accordionBody.style.maxHeight) {//yopdi
            accordionBody.style.maxHeight = null;
            e.target.firstElementChild.className = "fa fa-folder-o";
        } else {//ochdi
            accordionTogglers.forEach(function (othertogglers) { //qolganlarini yopdi va targetni ochdi
                othertogglers.nextElementSibling.style.maxHeight = null;
                othertogglers.firstElementChild.className = "fa fa-folder-o";
            })
            accordionBody.style.maxHeight = `${accordionBody.scrollHeight}px`; //height is set according to its content's height
            e.target.firstElementChild.className = "fa fa-folder-open-o";
        }
    })

});

// toggle component content
let componentTriggers = document.querySelectorAll(".component-trigger");
componentTriggers.forEach(function (li) {
    li.addEventListener("click", (e) => {

        componentTriggers.forEach((otherLiElements) => {
            otherLiElements.classList.remove("active");//qolgan li lardan active ni olib tashadi
        })
        e.target.classList.add("active");//bosilgan li ga active class qo'shdi

        let target = li.dataset.target;
        let otherComponents = document.querySelectorAll(".component-content");
        otherComponents.forEach((otherComponent) => {
            otherComponent.style.display = "none";//noshqa componentlarni o'chirdi
        });
        document.querySelector(`.${target}`).style.display = "block";//target componentni yoqdi

        // media uchun : accordion-body ni o'chiradi
        if (screen.width < 768) {
            document.querySelector(".accordion").style.transform = "scale(0)";
        }
    })
})

// accordion button for SM media

let acordion_media_open = document.querySelector("#accordion-media-opener");
acordion_media_open.addEventListener("click", () => {
    document.querySelector(".accordion").style.transform = "scale(1)";
})
// accordion-media-closer
document.querySelector("#accordion-media-closer").addEventListener("click", () => {
    document.querySelector(".accordion").style.transform = "scale(0)";
})


// *************************AI TEST**************************

let start = confirm("AI testni yechishga tayyormisiz ?");
let savol = document.querySelector("#savol");
let variantlar = document.querySelector("#variantlar");
let next = document.querySelector("#next_question");
let end = document.querySelector("#end_test");

let kasblar = {
    dasturchi: 0,
    dizayner: 0,
    marketolog: 0,
    arxitektor: 0,
    moliyaviy_maslahatchi: 0,
    investor: 0,
    tarjimon: 0,
    menejer: 0,
    doktor: 0,
    huquqshunos: 0,
    injener: 0
};
let feedback = {
    dasturchi: ["https://img.freepik.com/free-photo/young-cheerful-programmer-with-headphones-looking-you-with-smile-during-work-new-software-office_274679-9896.jpg?size=626&ext=jpg", "Siz yangi ixtirochisiz. Dunyo dasturiy ta'minotga o'tmoqda va ixtirochilarning keyingi to'lqini esa kod yozish bilan shug'ullanadi. Bu avlodning bir qismi bo'ling. Mana bu dasturchini qarang. Ish qilyaptimi yoki dam olyaptimi bilib bo'lmaydi 😀"],
    dizayner: ["https://www.careergirls.org/wp-content/uploads/2018/05/Industrial_Designer1920x1080.jpg", "Siz dizaynersiz ! Bu soha juda keng qamrovli soha. Dasturchilikdan tortib, qurilish sohasigacha bu kasb egalariga talab juda yuqori. Balki keyingi TESLA avtomobillari tashqi ko'rinishini siz yaratarsiz 🙄"],
    marketolog: ["https://i2.wp.com/ktonanovenkogo.ru/image/rabota-marketologa.jpg", "Siz haqiqiy marketologsiz. Endi kompaniyaning rivojlanish ko'rsatkichi ko'p jihatdan sizga bog'liq. Mahsulot, bozor tadqiqoti, bizness strategiya, brending, reklama - bular sizning expert sohangiz. Faqat 'g'irrom biznes' ga odamlarni targ'ib qilmang."],
    arxitektor: ["https://www.arch2o.com/wp-content/uploads/2015/03/Arch2O-250-things-an-architect-should-know.png", "siz arxitektorsiz ! To‘g‘ri, ancha murakkabliklarga ega kasb. Afsonaviy uchar bog‘lari bilan yangi Semiramida qasrini qurmoqchimisiz? Unda olg‘a! Aytgancha, boshqa sohaga qaraganda, arxitekturada o‘zining shaxsiy biznesini yo‘lga qo‘yish ancha oson. Loyihaga berilgan buyurtmani bajarish uchun arxitektorga qimmatbaho ta’minot zarur emas. Loyihani oddiy qalam bilan vatmanda ham chizish mumkin. Asosiysi – qanday chizishda. Loyihasiz hech qaysi o‘zini hurmat qiladigan qurilish firmasi, hattoki oddiy saroyning qurilishiga kirishmaydi. Shunday ekan arxitektor – mutaxassisning tajribasi va bilimi – eng muhim bo‘lgan kasb."],
    moliyaviy_maslahatchi: ["https://images.moneycontrol.com/static-mcnews/2018/02/financial-advisor-770x433.jpg?impolicy=website&width=770&height=431", "Siz moliyaviy maslahatchisiz. Moliyaviy maslahatchi nafaqat investitsiyalarga yordam beradigan odam. Ularning vazifasi - moliyaviy hayotimizning har bir sohasida bizga yordam berish. Pulni boshqarishni bilgan odam uni ishlab topishda hech qiyinchilik ko'rmasa kerak."],
    investor: ["https://getblogo.com/wp-content/uploads/2021/06/5-Habits-Of-Successful-Investors-That-You-Need-To-Start-Following.jpg", "Siz investorsiz. Investorlar turli xil tavakkalchiliklarga, kapitalga, uslublarga, imtiyozlarga va vaqt oralig'iga ega. Misol uchun, ba'zi investorlar katta daromad olish maqsadida qo'shimcha tavakkalchilikka ko'proq moyil bo'lishadi. Bu sarmoyadorlar har kuni valyuta, rivojlanayotgan bozor yoki qimmatli qog'ozlarga sarmoya kiritishlari mumkin."],
    tarjimon: ["https://images.theconversation.com/files/257103/original/file-20190204-193192-kkemi1.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip", ""],
    menejer: 0,
    doktor: 0,
    huquqshunos: 0,
    injener: 0
};

let savollar = [
    {
        savol: "Siz ulardan qaysi birida yaxshiroqsiz?",
        variant: [
            {
                image: "https://previews.123rf.com/images/srr283/srr2831903/srr283190300033/121631775-a-man-thinking-how-to-solve-a-math-problem.jpg",
                text: "Qiyin muammolarga yechim topish",
                correlations: ["dasturchi", "moliyaviy_maslahatchi", "doktor", "injener"]
            },
            {
                image: "https://bitnine.net/wp-content/uploads/2016/11/How-to-win-a-debate-according-to-Harvard%E2%80%99s-world-champion-debate-team1.jpg",
                text: "Muhokama (debate)larda yutib chiqish",
                correlations: ["marketolog", "menejer", "huquqshunos"]
            },
            {
                image: "https://speakeasyideas.com/wp-content/uploads/2016/08/iStock_51010848_LARGE-2-1080x675.jpg",
                text: "Boshqalarga yordam berish",
                correlations: ["moliyaviy_maslahatchi", "doktor", "injener"]
            },
            {
                image: "https://i.inews.co.uk/content/uploads/2021/04/SEI_75639931-1-1024x675.jpg",
                text: "Men qayg'uradigan narsalarga boshqalarni ham qo'shilishga undash",
                correlations: ["marketolog", "huquqshunos", "menejer"]
            },
            {
                image: "https://positivepsychology.com/wp-content/uploads/empathy-kids.jpg",
                text: "Odamlarga hamdardlik bildirish",
                correlations: ["tarjimon", "doktor"]
            },

        ]
    },
    {
        savol: "Kim bilan kechki ovqatni tanovvul qilishni xohlardingiz?",
        variant: [
            {
                image: "https://repost.uz/storage/uploads/93-1599049404-ads-post-material.jpeg",
                text: "Otabek Mahkamov",
                correlations: ["huquqshunos", "tarjimon", "moliyaviy_maslahatchi"]
            },
            {
                image: "https://cdn.britannica.com/45/223045-050-A6453D5D/Telsa-CEO-Elon-Musk-2014.jpg",
                text: "Elon Musk",
                correlations: ["dasturchi", "arxitektor", "investor", "injener"]
            },
            {
                image: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/2/19/1424347528245/e4454b85-de8d-4061-afbc-c6edf9a69562-1020x765.jpeg?width=700&quality=85&auto=format&fit=max&s=fa8665027fa630b7b2c48c47e64be53c",
                text: "Dr Gregory House",
                correlations: ["doktor", "menejer"]
            },
            {
                image: "https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/201808/calvin_cleine_getty-647x1200.jpg?8PMwIty4dHUrFKY5jVFZDpz1TNzQdfPp",
                text: "Calvin Klein",
                correlations: ["dizayner", "marketolog"]
            },
            {
                image: "https://i.ytimg.com/vi/MAfIvBgChjQ/maxresdefault.jpg",
                text: "Mr Hulk (Smash)",
                correlations: ["A bu kechki ovqatga sizni qo'shib yeb qo'yadiku :)"]
            }

        ]
    },
    {
        savol: " ",
        variant: [
            {
                image: "",
                text: "",
                correlations: [" ", " ", " "]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },

        ]
    },
    {
        savol: " ",
        variant: [
            {
                image: "",
                text: "",
                correlations: [" ", " ", " "]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },

        ]
    },
    {
        savol: " ",
        variant: [
            {
                image: "",
                text: "",
                correlations: [" ", " ", " "]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },

        ]
    },
    {
        savol: " ",
        variant: [
            {
                image: "",
                text: "",
                correlations: [" ", " ", " "]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },
            {
                image: "",
                text: "",
                correlations: ["", ""]
            },

        ]
    }

];
// set a question
let index = 0;
if (start) {
    document.querySelector("#AI_test").style.display = "flex";
    document.querySelector("#main").style.display = "none";

    function setQuestion(index) {

        let question = savollar[index]; //js dagi array savollar
        savol.innerHTML = `${index + 1} - savol. ${question.savol}`; //htmlga render qilish uchun

        variantlar.innerHTML = ""; //variantlarni tozalab, keyin to'ldiradi
        question.variant.forEach((option, index) => {

            variantlar.innerHTML += `  
            <li>
                <img src="${option.image}" alt="question image ${index}">
                <input required type="radio" name="variant" id="${index}" value="${index}">
                <p>${option.text}</p>
            </li>`;
        });
    }

    setQuestion(index); //1-reder uchun. Keyingilari "next" button bosilganda ishlaydi
}

// get previous values and calculate correlations , then go to NEXT question
document.querySelector(".AI_form").addEventListener("submit", (e) => {

    let data = new FormData(document.querySelector(".AI_form"));
    let checked = "";//tanlangan javob indexini aniqlayapti
    for (const entry of data) {
        checked = entry[1];
    };

    // tanlagan javob korrelatsiyasini kasblarga moslab, mos kasblarni qiymatini oshirib qo'ymoqda:
    savollar[index].variant[checked].correlations.forEach((elem) => {
        kasblar[elem]++;
    })

    e.preventDefault(); //bu submit eventini boshqa sahifaga yo'naltirvormaslik uchun

    index++;
    setQuestion(index);//next question
})


// end question
end.addEventListener("click", (e) => {
    // eng ko'p yig'ilgan kasb qiymatini topyapti
    let result = Object.values(kasblar).reduce((previousVal, currentVal) => {
        return (previousVal > currentVal) ? previousVal : currentVal;
    });

    // shu qiymatli kasblarni chiqaryapti
    document.querySelector("#natija").innerHTML = "";
    for (const [key, value] of Object.entries(kasblar)) {

        if (value === Number(result)) {
            console.log(`${key}: ${value}`);
            // formani o'chiradi
            document.querySelector(".AI_form").style.display = "none";
            // natijani chiqaradi
            document.querySelector("#natija").innerHTML += ` 
            <h3>O'ylashimcha sizga eng ma'qul keladigan kasb :</h3>
            <h2 id="natija_nomi">${key}</h2>
            <img id="natija_rasmi" src="${feedback[key][0]}" alt="${key}:${value}">
            <p id="natija_matni" >${feedback[key][1]}</p>
            <button id="closeResult" onClick = "close_test()"><i class="fa fa-times-circle-o" aria-hidden="true"></i></button>`
        }
        else{
            
        }

    }
   
})
 // AI_test ni yopish buyrug'i:
function close_test() {
    document.querySelector("#AI_test").style.display = "none";
    document.querySelector("#main").style.display = "grid";
};


/***trash
        // variantlar.childNodes.forEach(function (elem, index) {
        //     if (elem.nodeType === 1) {
        //         let question_img = elem.nextElementSibling.firstElementChild;
        //         // elem.innerHTML = "ssss"
        //         console.log(question_img, index)
        //     }
        // });

          // for (let [index, value] in kasblar) {
    //     if (kasblar[index] === result) {
    //         console.log(value)
    //     }
    // }
 */