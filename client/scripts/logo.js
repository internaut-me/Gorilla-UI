$( document ).ready(function() {
$( "#brand" ).hover( function() {
$( "#brand-popup" ).removeClass( 'hidden' );
},
function() {
$( "#brand-popup" ).addClass( 'hidden' );
});
});