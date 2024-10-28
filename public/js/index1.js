const apiUrl = 'http://localhost:3000/delete';
let changeIconNav = true;
let changeIconSide = true;
let navIcons = document.querySelector('#dpd-dot');
let search = document.querySelector("#search");
let sidebar = document.querySelector("#sidebar");
let sideIconClose = $("#sdbr-icn svg").eq(0);
let sideIconOpen = $("#sdbr-icn svg").eq(1);
let sideIconContainer = $("#sdbr-icn");



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
$("#dpd-dot").on("mouseenter", function () {
    $("#dpd-dot svg").eq(0).hide();
    $("#dpd-dot svg").eq(1).show();
    $("#hddn-nav").css("display", "inline-flex");
});

$("#dpd-dot").on("mouseleave", function () {
    $("#dpd-dot svg").eq(1).hide();
    $("#dpd-dot svg").eq(0).show();
    $("#hddn-nav").on("mouseenter", function () {
        $("#dpd-dot svg").eq(1).show();
        $("#dpd-dot svg").eq(0).hide();
        $("#hddn-nav").css("display", "inline-flex");
    });
    $("#hddn-nav").on("mouseleave", function () {
        $("#hddn-nav").hide();
        $("#dpd-dot svg").eq(1).hide();
        $("#dpd-dot svg").eq(0).show();
    })
    $("#hddn-nav").hide();
    
});

// To change the side bar icons
sideIconOpen.hide();
sideIconContainer.on("mouseenter", function () {
    sideIconClose.hide();
    sideIconOpen.show();
    $("#hddn-sdbr").show();
});

sideIconContainer.on("mouseleave", function () {
    sideIconOpen.hide();
    sideIconClose.show();
    $("#hddn-sdbr").on("mouseenter", function () {
        $("#hddn-sdbr").show();
        sideIconOpen.show();
        sideIconClose.hide();
    });
    $("#hddn-sdbr").on("mouseleave", function (){
        $("#hddn-sdbr").hide();
        sideIconOpen.hide();
        sideIconClose.show();
    })
    $("#hddn-sdbr").hide();

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

