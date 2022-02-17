import { By, WebDriver } from "selenium-webdriver";

export class SpecPage {
    driver: WebDriver
    url: string = "walmart.com";

    searchBar: By = By.css("input");
    results: By = By.css("notSure");

    constructor(driver: WebDriver) {
        this.driver = driver;
    }


    async navigate() {
        return await this.driver.get(this.url)
    }

    async doSearch(elementBy: By, term: string) {
        return this.doSearch(this.searchBar, `${Text}\n`);
        
    }

    async getText(elementBy: By) {
        let text = this.driver.findElement(elementBy)
        return await text.getText()
    }

    async getResults() {
         return this.getText(this.results);
    }
}