 const copy = function (value) {
     $('#article').append(`<input type="text" class="copy-text" maxlength=999999999 >`)
     $('.copy-text').val(value).select();
     document.execCommand("copy")
     $('.copy-text').remove()
 }
 export default copy;