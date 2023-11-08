(() => {
    "use strict";
    function checkInput() {
        const elems = {
            inputLessonTopic: document.querySelector(".form__input"),
            boxForm: document.querySelector(".form__lesson-topic"),
            allItems: document.querySelectorAll(".form__hint span"),
            textArea: document.querySelector(".form__typing-text"),
            textAreaCount: document.querySelector(".form__count"),
            textAreaCountSpan: document.querySelector(".form__count span"),
            textAreaCountDiv: document.querySelector(".form__count div"),
            formBox: document.querySelector(".form__box"),
            nextButton: document.querySelector(".form__button-next")
        };
        document.addEventListener("click", (function(e) {
            const target = e.target;
            target.closest(".form__hint span") && handleSpanClick(target);
            target.closest(".form__input-clear") && handleClearClick();
            target.classList.contains("form__show-more") && handleShowMoreClick();
        }));
        elems.inputLessonTopic.addEventListener("input", handleInputChange);
        elems.textArea.addEventListener("input", handleTextAreaChange);
        [ "focus", "blur" ].forEach((event => {
            elems.inputLessonTopic.addEventListener(event, toggleColor.bind(null, elems.boxForm));
            elems.textArea.addEventListener(event, toggleColor.bind(null, elems.formBox));
        }));
        function handleSpanClick(target) {
            elems.inputLessonTopic.value = target.textContent;
            addClass(elems.boxForm);
        }
        function handleClearClick() {
            elems.inputLessonTopic.value = "";
            removeClass(elems.boxForm);
        }
        function handleShowMoreClick() {
            elems.allItems.forEach((elem => elem.removeAttribute("hidden")));
        }
        function handleInputChange() {
            elems.inputLessonTopic.value.length > 0 ? addClass(elems.boxForm) : removeClass(elems.boxForm);
        }
        function handleTextAreaChange() {
            const textLength = elems.textArea.value.length;
            elems.textAreaCountSpan.innerHTML = `${textLength} / 200`;
            if (textLength > 200) {
                addClass(elems.formBox, "error");
                addClass(elems.textAreaCount, "error");
                removeClass(elems.formBox, "color");
                elems.textAreaCountDiv.textContent = "Enter your name";
            } else {
                removeClass(elems.formBox, "error");
                removeClass(elems.textAreaCount, "error");
                addClass(elems.formBox, "color");
                elems.textAreaCountDiv.textContent = "";
            }
            textLength >= 1 ? addClass(elems.nextButton) : removeClass(elems.nextButton);
        }
        function toggleColor(element, event) {
            event.type === "focus" && !element.classList.contains("error") ? addClass(element, "color") : removeClass(element, "color");
        }
        function addClass(element, className = "active") {
            element.classList.add(className);
        }
        function removeClass(element, className = "active") {
            element.classList.remove(className);
        }
    }
    checkInput();
    function createCustomSelect() {
        const selectWrap = document.querySelector(".form__select-wrap");
        const select = selectWrap.querySelector(".form__select");
        const customSelect = document.createElement("div");
        customSelect.classList.add("custom-select");
        const selected = document.createElement("div");
        selected.classList.add("selected");
        const options = document.createElement("div");
        options.classList.add("options");
        for (const option of select.options) {
            const customOption = document.createElement("div");
            customOption.classList.add("option");
            customOption.textContent = option.textContent;
            customOption.dataset.value = option.value;
            if (option.selected) selected.textContent = option.textContent;
            customOption.addEventListener("click", (() => {
                selected.textContent = customOption.textContent;
                select.value = customOption.dataset.value;
                options.classList.remove("show");
                selected.classList.remove("select-open");
            }));
            options.appendChild(customOption);
        }
        customSelect.appendChild(selected);
        customSelect.appendChild(options);
        selectWrap.replaceChild(customSelect, select);
        selected.addEventListener("click", (e => {
            const target = e.target;
            options.classList.toggle("show");
            if (target.classList.contains("selected")) target.classList.toggle("select-open");
        }));
        document.addEventListener("click", (function(e) {
            const option = document.querySelectorAll(".option");
            const target = e.target;
            if (target.closest(".options")) {
                for (const elem of option) elem.classList.remove("check");
                target.classList.add("check");
            }
        }));
    }
    createCustomSelect();
})();