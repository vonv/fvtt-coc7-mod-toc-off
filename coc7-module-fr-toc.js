/* Scripts des Compendiums FR de Toc pour le système CoC7 pour Foundry VTT */

// message d'accueil à l'activation du module
async function welcomeMessage() {
  ChatMessage.create({
    type: CONST.CHAT_MESSAGE_TYPES.OTHER,
    content: '🐙 Ph\'n glui,<br />Cliquez @UUID[Compendium.coc7-module-fr-toc.fr-compendiums-journalentry.JournalEntry.ew3N9xBidfE8M2td]{ici} pour accéder à toute la documentation de ces compendiums pour l\'Appel V7. Bon jeu !',
    speaker: { alias: "Cthulhu" }
  })
  game.user.setFlag("coc7-module-fr-toc", "welcomeMessageShown", true)
}

Hooks.on('ready', async function () {
  // mise à jour automatique des paramètres du système CoC7
  if (game.settings.get('CoC7', 'overrideSheetArtwork')) {
    const settings = {
      artworkMainFont: 'url(\'./modules/coc7-module-fr-toc/fonts/mailart-rubberstamp.ttf\') format(\'truetype\')',
      artworkMainFontBold: 'url(\'./modules/coc7-module-fr-toc/fonts/mailart-rubberstamp.ttf\') format(\'truetype\')',
      artworkMainFontSize: 16,
      artworkBackgroundColor: 'rgba(43,55,83,1)',
      artworkFrontColor: 'rgba(43,55,83,1)',
      artworkFixedSkillLength: false,
      unitDieColorset: 'white',
      tenDieNoMod: 'black',
      tenDieBonus: 'foundry',
      tenDiePenalty: 'bloodmoon',
      // oneBlockBackstory: true,
      displayPlayerNameOnSheet: true
    }
    game.settings.settings.forEach(async setting => {
      if (typeof settings[setting.key] !== 'undefined' && 
            game.settings.get('CoC7', setting.key) !== settings[setting.key]) {
              await game.settings.set('CoC7', setting.key, settings[setting.key])
      }
    })

    // message d'accueil à l'activation du module
    if (!game.user.getFlag("coc7-module-fr-toc", "welcomeMessageShown")) {
        welcomeMessage()
    }

  } else {
    await game.settings.set('CoC7', 'overrideSheetArtwork', true)
    window.location.reload()
  }

})

Hooks.on('renderPause', async function () {
  // mise à jour du logo de pause
  document.getElementById("pause").children[0].setAttribute("src", "modules/coc7-module-fr-toc/images/logo.webp")
  document.getElementById("pause").children[1].innerHTML = "Cthulhu dort & attend..."
})

Hooks.on('renderJournalSheet', (app, html, options) => {
  // lien direct vers un compendium
  html.on('click', 'a.pack-link', (event) => {
    const anchorElem = event.currentTarget;
    const packName = anchorElem?.dataset?.packName;
    const pack = game.packs.get(packName);
    if ( pack ) {
      pack.render(true);
    }
  })
})

Hooks.once('init', async () => {
  // ajout des époques Achtung Cthulhu et Achtung Pulp
  game.CoC7.eras('achtung', 'Achtung Cthulhu')
  game.CoC7.eras('achtungPulp', 'Achtung Cthulhu Pulp')
  game.CoC7.eras('deltagreen', 'Delta Green')
  game.CoC7.eras('deltagreenVN', 'Delta Green Viet Nam')
  game.CoC7.eras('contreesReve', 'Les Contrées du Rêve')
  game.CoC7.eras('findestemps', 'Fin des Temps')
  game.CoC7.eras('futuriste', 'Futuriste')
})

// mise à jour du logo en haut à gauche
document.getElementById("logo").setAttribute("src", "modules/coc7-module-fr-toc/images/logo.webp")
