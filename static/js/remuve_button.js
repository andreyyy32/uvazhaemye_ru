var delListButton = document.querySelectorAll('.tile_list');
var sateBar = document.querySelector('.sate-baq');

if (sateBar) {
    for (let i = 0; i < delListButton.length; i++)
        delListButton[i].style.display = 'none';
}