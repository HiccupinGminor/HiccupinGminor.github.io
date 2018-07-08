function renderImageGrid(mountNode, prefix, cb, id) {
  var i = 1;
  for(i; i <= 15; i ++) {
    var div, a, img, source;
    div = document.createElement('div');
    a = document.createElement('a');
    source = "/images/seventeenth-vs-fifteenth/" + prefix + '-' + i + ".jpg";
    a.href = source;
    img = document.createElement('img');
    img.src = source;
    // a.appendChild(img);
    div.appendChild(img)
    div.className = "grid-item"; // Masonry
    mountNode.appendChild(div);
  }
  cb(id);
}

function initializeMasonry(id) {
  var grid = document.getElementById(id);

  var msnry = new Masonry( grid, {
    itemSelector: '.grid-item',
    columnWidth: 200,
    // percentPosition: true
  });

  imagesLoaded( grid ).on('progress', function() {
    // layout Masonry after each image loads
    msnry.layout();
  });
}

var seventeenthGallery = document.getElementById('17th-century-gallery');
renderImageGrid(seventeenthGallery, '17th', initializeMasonry, '17th-century-gallery');

var fifteenthGallery = document.getElementById('15th-century-gallery');
renderImageGrid(fifteenthGallery, '15th', initializeMasonry, '15th-century-gallery');
