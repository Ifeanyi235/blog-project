const apiUrl = 'http://localhost:3000/delete';
let changeIconNav = true;
let changeIconSide = true;
let navIcons = document.querySelector('#dpd-dot');
let search = document.querySelector("#search");
let sidebar = document.querySelector("#sidebar");
let sideIconClose = $("#sdbr-icn svg").eq(0);
let sideIconOpen = $("#sdbr-icn svg").eq(1);



$("#delete").on("click", async function (event) {
    const index = $("#delete").attr('data-index');
    const response = await fetch (`${apiUrl}/${index}`, {
        method: "DELETE"
    });
    if (response.ok) {
        console.log(`Item at index ${index} deleted successfully.`);
    } else {
        console.error(`Failed to delete item at index ${index}.`);
    }
});

// To change the nav icons
$("#dpd-dot svg").eq(0).on("mouseenter", function () {
    $("#dpd-dot svg").eq(0).hide();
    $("#dpd-dot svg").eq(1).show();
});

$("#dpd-dot svg").eq(1).on("mouseleave", function () {
    $("#dpd-dot svg").eq(1).hide();
    $("#dpd-dot svg").eq(0).show();
});

// To change the side bar icons
sideIconOpen.hide();
sideIconClose.on("mouseenter", function () {
    sideIconClose.hide();
    sideIconOpen.show();
})

sideIconOpen.on("mouseleave", function () {
    sideIconOpen.hide();
    sideIconClose.show();
})

function checkVisibility (element) {
    const style = window.getComputedStyle(element);
    return style.display !== "none";
}

setInterval (() => {

    if (checkVisibility(sidebar)) {
        const sidebar_width = window.getComputedStyle(search).width;
        let adj_width = sidebar_width.match(/\d+/)[0];
        $("#article-home").css("transform", `translate(-${adj_width / 1.9}px, 0%)`);
    } else {
        $("#sdbr-icn").show();
        $("#article-home").css("transform", `translate(-50%, 0%)`);
    }

    if (checkVisibility(navIcons) && changeIconNav) {
        changeIconNav = false;
        $("#header div").eq(2).hide();
        $("#header div").eq(3).hide();
        $("dpd-dot").show();
        $("#dpd-dot svg").eq(1).hide();
    } else if (checkVisibility(navIcons) === false && changeIconNav === false) {
        changeIconNav = true;
        $("#header div").eq(2).show();
        $("#header div").eq(3).show();
    }


}, 10);

