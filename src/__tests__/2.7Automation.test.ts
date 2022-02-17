import { Builder, By, Capabilities, until, WebDriver} from "selenium-webdriver"
import {EnterWantedPage} from "./EnterWantedPage"
const chromedriver = require("chromedriver")

const driver: WebDriver = new Builder()
.withCapabilities(Capabilities.chrome())
.build()

const raceTest = new EnterWantedPage(driver, 'https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html')
const sexTest = new EnterWantedPage(driver, 'https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html')

test("Testing valid Race Input", async () => {
    await raceTest.navigate()
    await raceTest.setInput(raceTest.racInput, "H")
    await raceTest.click(raceTest.submit)
    let response = await raceTest.getText(raceTest.results)
    expect(response).not.toContain('The "Race" field should be 1 character long.')
})
test("Testing invalid Race Input", async () => {
    await raceTest.navigate()
    await raceTest.setInput(raceTest.racInput, "Hi")
    await raceTest.click(raceTest.submit)
    let response = await raceTest.getText(raceTest.results)
    expect(response).toContain('The "Race" field should be 1 character long.')
})

test("Testing valid Sex Input, One Character", async () => {
    await sexTest.navigate()
    await sexTest.setInput(sexTest.sexInput, "M")
    await sexTest.click(sexTest.submit)
    let response = await sexTest.getText(sexTest.results)
    expect(response).not.toContain('The "Sex" field should be 1 character long.')
})
test("Testing valid Sex Input, Correct Character", async () => {
    await sexTest.navigate()
    await sexTest.setInput(sexTest.sexInput, "M")
    await sexTest.click(sexTest.submit)
    let response = await sexTest.getText(sexTest.results)
    expect(response).not.toContain('The "Sex" field must be entered in as a single character, M for male, F for female, U for unknown.')
})
test("Testing invalid Sex Input, More than one Character", async () => {
    await sexTest.navigate()
    await sexTest.setInput(sexTest.sexInput, "Man")
    await sexTest.click(sexTest.submit)
    let response = await sexTest.getText(sexTest.results)
    expect(response).toContain('The "Sex" field should be 1 character long.')
})
test("Testing invalid Sex Input, Incorrect Character", async () => {
    await sexTest.navigate()
    await sexTest.setInput(sexTest.sexInput, "P")
    await sexTest.click(sexTest.submit)
    let response = await sexTest.getText(sexTest.results)
    expect(response).toContain('The "Sex" field must be entered in as a single character, M for male, F for female, U for unknown.')
})
