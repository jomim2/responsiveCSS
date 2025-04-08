class HomePage {
    constructor(id, imgAreaId, textAreaId, apiArea) {
        this.id = id;
        this.imgArea = document.getElementById(imgAreaId);
        this.textArea = document.getElementById(textAreaId);
        this.imgs = [
            "../src/img/tree1.JPG",
            "../src/img/tree2.JPG",
            "../src/img/tree3.JPG"
        ];
        this.texts = [
            "hello Mimi",
            "welcome Mimi",
            "I Like Tree"
        ];
        this.currentIndex = 0;
        // api
        this.apiKey = "412e20d92030bf157d7b8e8e05c5d379";
        this.city = "Ansan";
        this.url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric&lang=kr`;
        this.apiArea = document.getElementById(apiArea);
    }

    displayImg() {
        this.imgArea.innerHTML = "";
        const img = document.createElement("div");
        const text = document.createElement("p");

        img.className = "treeImg";
        img.style.backgroundImage = `url(${this.imgs[this.currentIndex]})`;

        text.textContent = this.texts[this.currentIndex];
        text.className = "textP";

        this.imgArea.appendChild(img);
        this.imgArea.appendChild(text);

        setTimeout(() => {
            img.classList.add("fade");
            text.classList.add("fade");
        }, 50);

        this.currentIndex = (this.currentIndex + 1) % this.imgs.length;
    }
    getApi() {
        console.log("요청할 URL 👉", this.url);

        fetch(this.url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const temp = data.main.temp;
                const description = data.weather[0].description;
                console.log(`현재 온도: ${temp}°C, 상태: ${description}`);
                const tempP = document.createElement("p");
                tempP.textContent = `${temp}°C`;
                const tempDes = document.createElement("p");
                tempDes.textContent = `상태: ${description}`;
                this.apiArea.appendChild(tempP);
                this.apiArea.appendChild(tempDes);
            })
            .catch(error => {
                console.error("에러 발생:", error);
            });
    }
    menuBtnEvent() {
        const btn = document.getElementById("menuBtn");
        const nav = document.getElementById("nav");

        btn.addEventListener("click", () => {
            nav.classList.toggle("open");
        });
    }
    run() {
        this.getApi();
        this.displayImg();
        this.menuBtnEvent();
        setInterval(() => this.displayImg(), 6000);

    }
}

const homePage = new HomePage("homePage", "imgArea", "textArea", "apiArea");
homePage.run();