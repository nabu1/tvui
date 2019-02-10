/* eslint-disable*/
describe('I. Selection by hours', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    .get("[data-test='day']").as('day')
    .get("[data-test='startHour']").as('startHour')
    .get("[data-test='endHour']").as('endHour')
    .get("[data-test='textSearch']").as('textSearch')
    .get("[data-test='btnSearch']").as('btnSearch')
    .get("[data-test='btnResetAll']").as('btnResetAll')
    .get("[data-test='btnShow']").as('btnShow')
    .get("[data-test='btnResetFavorites']").as('btnResetFavorites')
  })

  it('1. Entering nothing gets "Nie, 10 Luty" in results "Dzień" row', () => {
    cy.get('@btnSearch')
      .click()
      .get('tr:nth-child(1) > td:nth-child(2)', { timeout: 8000 })
      .should('have.text', 'Nie, 10 Luty')
  })

  it('2. Entering "Nie, 10 Luty" gets "Nie, 10 Luty" in results "Dzień" row', () => {
      cy.get('@day').select('Pon 11 Luty')
      .get('@btnSearch').click()

      .get('spinner').should('not.be.visible')

      .get('tr:nth-child(1) > td:nth-child(2)', { timeout: 6000 }).should('be.visible').should('have.text', 'Pon, 11 Luty')
      .should('be.visible').get('tr:nth-child(1) > td:nth-child(2)').should('have.text', 'Pon, 11 Luty')
  })

  it('3. Entering 23 in startHour gets results starting with "22" in "Czas" column', () => {
    cy.get('@startHour').select('23').wait(2000)
    .get('@btnSearch').click()
    .get('#table > tbody > tr:nth-child(1) > td:nth-child(4)', { timeout: 6000 }).contains(/23/).should('exist')
  })

  it('4. Entering "Sob Wt 12 Luty" and "6" as endHour gets results \
          ending with "4" or "5" in "Czas" column', () => {
    cy.get('@day').select('Wt 12 Luty').wait(1000)
    .get('@endHour').select('6').wait(1000)
    .get('@btnSearch').click()
    .get('#table > tbody > tr:last > td:nth-child(4)', { timeout: 6000 }).contains(/5.*/).should('exist')
  })

  it('5. Entering "Pon 11 Luty" and "10" as startHour and "14" as endHour \
              gets results starting with "10" and "12" or "13" in "Czas" column', () => {
    cy.get('@day').select('Pon 11 Luty')
    .get('@startHour').select('10')
    .get('@endHour').select('14').wait(2000)
    .get('@btnSearch').click()
    .get('#table > tbody > tr:first > td:nth-child(4)', { timeout: 6000 }).contains(/9.*/).should('exist')
    .get('#table > tbody > tr:last > td:nth-child(4)').contains(/[12,13].*/).should('exist')
  })
})

describe('II. Selection by categories', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    .get("[data-test='day']").as('day')
    .get("[data-test='startHour']").as('startHour')
    .get("[data-test='endHour']").as('endHour')
    .get("[data-test='textSearch']").as('textSearch')
    .get("[data-test='btnSearch']").as('btnSearch')
    .get("[data-test='btnResetAll']").as('btnResetAll')
    .get("[data-test='btnShow']").as('btnShow')
    .get("[data-test='btnResetFavorites']").as('btnResetFavorites')
  })

  it('1. Checking "Inne" gets "inne" as a category name in the 1st \
      and last row of the table', () => {
    cy.get('@day')
    .select('Pon 11 Luty').get('@btnSearch').click()
    .get('#categories > div:nth-child(2) > label > span').click()  // serial
    .get('#categories > div:nth-child(7) > label > span').click()  // inne

    .get('#table > tbody > tr:first > td:nth-child(7)').contains('inne').should('exist')
    .get('#table > tbody > tr:first > td:nth-child(7)').contains('film').should('not.exist')

    .get('#table > tbody > tr:last > td:nth-child(7)').contains('serial').should('exist')
  })

  it('2. Checking "Serial" and "Film" gets "film" or "serial" \
      as a category name in the 1st and last row of the table', () => {
    cy.get('@day')
    .select('Wt 12 Luty')
    .get('@btnSearch')
    .click()
    .get('spinner').should('not.be.visible')
    .get('#categories > div:nth-child(1) > label > span')  // Film
    .click()
    .get('#categories > div:nth-child(2) > label > span')  // Serial
    .click()
    .get('#table > tbody > tr:first > td:nth-child(7)')
    .contains('serial' || 'film')
    .should('exist')
    .get('#table > tbody > tr:last > td:nth-child(7)')
    .contains('serial' || 'film')
    .should('exist')
  })
})

// #categories > div:nth-child(7) > label > span
describe('III. Selection by hours and categories', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    .get("[data-test='day']").as('day')
    .get("[data-test='startHour']").as('startHour')
    .get("[data-test='endHour']").as('endHour')
    .get("[data-test='textSearch']").as('textSearch')
    .get("[data-test='btnSearch']").as('btnSearch')
    .get("[data-test='btnResetAll']").as('btnResetAll')
    .get("[data-test='btnShow']").as('btnShow')
    .get("[data-test='btnResetFavorites']").as('btnResetFavorites')
  })

  it('1. Entering "Pon, 11 Luty", checking "Serial" and "Inne" gets "serial" or "inne" \
              as a category name in the 1st and last row of the table', () => {

      cy.get('@day').select('Wt 12 Luty').wait(2000)
      .get('@btnSearch').click()
      //.get('spinner').should('not.be.visible')
      .get('#categories > div:nth-child(1) > label > span').click()
      .get('#categories > div:nth-child(2) > label > span').click()

      .get('#table > tbody > tr:first > td:nth-child(7)', { timeout: 6000 }).contains('serial').should('exist')
      .get('#table > tbody > tr:last > td:nth-child(7)').contains('film').should('exist')
  })

  it('2. Entering "Wt, 12 Luty", startHour = 10, endHour = 14, \
              checking "Sport" and "Wiadomosci" gets "sport" or "wiadomosci" \
              as a category name in the 1st and last row of the table', () => {

      cy.get('@day').select('Wt 12 Luty').wait(2000)
      .get('@startHour').select('10')
      .get('@endHour').select('14').wait(2000)
      .get('@btnSearch').click()
      //.get('spinner').should('not.be.visible')
      .get('#categories > div:nth-child(3) > label > span').click()
      .get('#categories > div:nth-child(4) > label > span').click()

      .get('#table > tbody > tr:first > td:nth-child(7)', { timeout: 6000 }).contains('wiadomosci').should('exist')
      .get('#table > tbody > tr:last > td:nth-child(7)').contains('wiadomosci').should('exist')
  })

})

describe('IV. Selection by stations and hours', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    .get("[data-test='day']").as('day')
    .get("[data-test='startHour']").as('startHour')
    .get("[data-test='endHour']").as('endHour')
    .get("[data-test='textSearch']").as('textSearch')
    .get("[data-test='btnSearch']").as('btnSearch')
  })

  it('1. Entering "Wt, 12 Luty", startHour = 10, endHour = 14, \
              checking "TVP1", "POLSAT" and "ATM Rozrywka" gets "TVP 1" \
              and "ATM Rozrywka" as a stations names in the 1st and last \
              row of the table', () => {

      cy.visit('http://localhost:8080/stations')
      .get("[data-test='stationsTvpTvn']").find('input').eq(0).click({force: true})
      .get("[data-test='stationsPolsat']").find('input').eq(1).click({force: true})
      .get("[data-test='stationsPolskie']").find('input').eq(2).click({force: true})
      .get("[data-test='btnOK']").click()

      .get('@day').select('Wt 12 Luty')
      .get('@startHour').select('10')
      .get('@endHour').select('14')
      .get('@btnSearch').click()

      .get('#table > tbody > tr:first > td:nth-child(3)').contains('TVP 1').should('exist')
      .get('#table > tbody > tr:last > td:nth-child(3)').contains('ATM Rozrywka').should('exist')
  })

})

describe('V. Selection by stations, categories and hours', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    .get("[data-test='day']").as('day')
    .get("[data-test='startHour']").as('startHour')
    .get("[data-test='endHour']").as('endHour')
    .get("[data-test='textSearch']").as('textSearch')
    .get("[data-test='btnSearch']").as('btnSearch')
  })

  it.only('1. Entering "Wt, 12 Luty", startHour = 10, endHour = 14, \
              checking "TVP1", "POLSAT" and "ATM Rozrywka" gets "TVP 1" \
              and "ATM Rozrywka" as a stations names in the 1st and last \
              row of the table', () => {

      cy.visit('http://localhost:8080/stations')
      .get("[data-test='stationsTvpTvn']").find('input').eq(1).click({force: true})
      .get("[data-test='stationsCanal']").find('input').eq(2).click({force: true})
      .get("[data-test='stationsDiscoveryNational']").find('input').eq(3).click({force: true})
      .get("[data-test='btnOK']").click().wait(500)

      .get('#categories > div:nth-child(2) > label > span').click().wait(500)
      .get('#categories > div:nth-child(7) > label > span').click()

      .get('@day').select('Wt 12 Luty')
      .get('@startHour').select('10')
      .get('@endHour').select('14')
      .get('@btnSearch').click()

      .get('#table > tbody > tr:first > td:nth-child(7)').contains('serial').should('exist')
      .get('#table > tbody > tr:nth-child(4) > td:nth-child(7)').contains('inne').should('exist')

      .get('#table > tbody > tr:first > td:nth-child(3)').contains('Nat Geo People HD').should('exist')
      .get('#table > tbody > tr:last > td:nth-child(3)').contains('TVP 2').should('exist')
  })

})

describe('VI. Selection by favorites, categories and hours', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    .get("[data-test='day']").as('day')
    .get("[data-test='startHour']").as('startHour')
    .get("[data-test='endHour']").as('endHour')
    .get("[data-test='textSearch']").as('textSearch')
    .get("[data-test='btnSearch']").as('btnSearch')
  })

  it.only('1. Entering "Wt, 12 Luty", startHour = 10, endHour = 14, \
              checking "TVP1", "POLSAT" and "ATM Rozrywka" gets "TVP 1" \
              and "ATM Rozrywka" as a stations names in the 1st and last \
              row of the table', () => {

      cy.visit('http://localhost:8080/stations')
      .get("[data-test='stationsTvpTvn']").find('input').eq(1).click({force: true})
      .get("[data-test='stationsCanal']").find('input').eq(2).click({force: true})
      .get("[data-test='stationsDiscoveryNational']").find('input').eq(3).click({force: true})
      .get("[data-test='btnOK']").click().wait(500)

      .get('#categories > div:nth-child(2) > label > span').click().wait(500)
      .get('#categories > div:nth-child(7) > label > span').click()

      .get('@day').select('Wt 12 Luty')
      .get('@startHour').select('10')
      .get('@endHour').select('14')
      .get('@btnSearch').click()

      //.pause()

      .get('#table > tbody > tr:first > td:nth-child(5)').dblclick()
      .get('#table > tbody > tr:nth-child(4) > td:nth-child(7)').dblclick()


      .get("[data-test='btnShow']").click().wait(500)

      .get('#table > tbody > tr:first > td:nth-child(5)').contains(/Opowieść/).should('exist')
      .get('#table > tbody > tr:last > td:nth-child(5)').contains(/Ostatni/).should('exist')
  })

})
