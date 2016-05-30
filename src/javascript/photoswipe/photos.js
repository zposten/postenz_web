var photos = photos || {};

photos.init = function () {
  var $pswp = $('.pswp')[0];

  $('.gallery').each(function () {
    $(this).on('click', 'figure', function (event) {
      event.preventDefault();

      var $index = $(this).index();
      var options = {
        index: $index,
        bgOpacity: 0.7,
        showHideOpacity: true
      };

      // Initialize PhotoSwipe
      var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, photos.list, options);
      lightBox.init();
    });
  });

  $(window).resize(photos.resize);
  photos.resize();
};

photos.resize = function () {
  $('.gallery figure').each(function () {
    var photo = photos.list[$(this).data('index')];

    var width = $(this).parent().width();
    var k = (width > 600) ? 1 : 0.5;

    $(this).width(k * 200 * photo.w / photo.h);
  });
};

photos.list = [
  {
    src: 'https://farm6.staticflickr.com/5789/22569131534_3df0b04b96_k.jpg',
    size: '2048x1612',
    msrc: 'https://farm6.staticflickr.com/5789/22569131534_413dc32383_n.jpg',
    caption: 'Lucy'
  },
  {
    src: 'https://farm1.staticflickr.com/779/22803462247_089191c557_k.jpg',
    size: '2048x1285',
    msrc: 'https://farm1.staticflickr.com/779/22803462247_64993c6b51_n.jpg',
    caption: 'Totally Naked in Big Sky Country'
  },
  {
    src: 'https://farm1.staticflickr.com/748/22829661879_57510a110c_k.jpg',
    size: '2048x1109',
    msrc: 'https://farm1.staticflickr.com/748/22829661879_283af85c10_n.jpg',
    caption: 'Shattered'
  },
  {
    src: 'https://farm1.staticflickr.com/636/22901825180_74eca2c966_k.jpg',
    size: '2048x1044',
    msrc: 'https://farm1.staticflickr.com/636/22901825180_50795e8d5e_n.jpg',
    caption: 'Dam Lights'
  },
  {
    src: 'https://farm1.staticflickr.com/563/22829650639_b706022001_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/563/22829650639_9a902accc8_n.jpg',
    caption: 'More Dam Lights'
  },
  {
    src: 'https://farm1.staticflickr.com/5686/22829627569_31a912e4a3_k.jpg',
    size: '2048x1005',
    msrc: 'https://farm1.staticflickr.com/5686/22829627569_ea4fc8f467_n.jpg',
    caption: 'Blurry Dam Lights'
  },
  {
    src: 'https://farm1.staticflickr.com/5824/22901781600_623a3a208f_k.jpg',
    size: '2048x902',
    msrc: 'https://farm1.staticflickr.com/5824/22901781600_327f6b2997_n.jpg',
    caption: 'Sunrise'
  },
  {
    src: 'https://farm6.staticflickr.com/604/22829660459_b9d278a60e_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm6.staticflickr.com/604/22829660459_f91c6ba2ec_n.jpg',
    caption: 'Jumping fences in the Badlands'
  },
  {
    src: 'https://farm1.staticflickr.com/627/23381479276_cab7b61bc7_k.jpg',
    size: '2048x1288',
    msrc: 'https://farm1.staticflickr.com/627/23381479276_d867913567_n.jpg',
    caption: 'Zeus Stick'
  },
  {
    src: 'https://farm1.staticflickr.com/760/22780479413_ce3d54ca8e_k.jpg',
    size: '2048x1613',
    msrc: 'https://farm1.staticflickr.com/760/22780479413_093f525ec1_n.jpg',
    caption: 'Little Monster'
  },
  {
    src: 'https://farm1.staticflickr.com/656/23111876790_cbfc8fdeb9_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/656/23111876790_08dd831ffe_n.jpg',
    caption: 'White Lights'
  },
  {
    src: 'https://farm1.staticflickr.com/599/22779283344_29890fab3a_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/599/22779283344_cbfaa8bc74_n.jpg',
    caption: 'Christmas Tree'
  },
  {
    src: 'https://farm1.staticflickr.com/5629/23407658115_cfa1899b10_k.jpg',
    size: '2048x879',
    msrc: 'https://farm1.staticflickr.com/5629/23407658115_851dece750_n.jpg',
    caption: 'Christmas Light'
  },
  {
    src: 'https://farm1.staticflickr.com/660/23407665635_3ab888138f_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/660/23407665635_5467419181_n.jpg',
    caption: 'Sausages'
  },
  {
    src: 'https://farm1.staticflickr.com/5718/23381508236_652f07c7bf_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/5718/23381508236_51da47a403_n.jpg',
    caption: 'Lovely Tree'
  },
  {
    src: 'https://farm1.staticflickr.com/590/23325125471_641573bf72_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/590/23325125471_83bc47a199_n.jpg',
    caption: 'Tree Branches'
  },
  {
    src: 'https://farm1.staticflickr.com/687/23039709779_d270aaed05_k.jpg',
    size: '2048x1449',
    msrc: 'https://farm1.staticflickr.com/687/23039709779_ce8df18e24_n.jpg',
    caption: 'Flagpole'
  },
  {
    src: 'https://farm1.staticflickr.com/5667/22779315044_bd520d4f3e_k.jpg',
    size: '2048x1319',
    msrc: 'https://farm1.staticflickr.com/5667/22779315044_493c12c3e8_n.jpg',
    caption: 'Rock Bottom'
  },
  {
    src: 'https://farm1.staticflickr.com/631/22780522083_149f61dafd_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/631/22780522083_a707aecd1a_n.jpg',
    caption: 'River Walk'
  },
  {
    src: 'https://farm1.staticflickr.com/724/23299220292_ce44e68386_k.jpg',
    size: '2048x1272',
    msrc: 'https://farm1.staticflickr.com/724/23299220292_d15b4826ac_n.jpg',
    caption: 'Green Bridge'
  },
  {
    src: 'https://farm1.staticflickr.com/577/23111927680_b4df9d1a81_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/577/23111927680_3d92ca27e2_n.jpg',
    caption: 'Marcus Fountain'
  },
  {
    src: 'https://farm1.staticflickr.com/660/23039734949_390c4f563d_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/660/23039734949_af60230e4e_n.jpg',
    caption: 'City Hall'
  },
  {
    src: 'https://farm1.staticflickr.com/5661/22779340084_2d3c80fb18_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/5661/22779340084_edcb3c4106_n.jpg',
    caption: 'Circles'
  },
  {
    src: 'https://farm1.staticflickr.com/5772/22779340844_9ff662a544_k.jpg',
    size: '2048x1166',
    msrc: 'https://farm1.staticflickr.com/5772/22779340844_0b1cc88a15_n.jpg',
    caption: 'Lovely Eye'
  },
  {
    src: 'https://farm1.staticflickr.com/601/23039739019_65e91dd364_k.jpg',
    size: '2048x1536',
    msrc: 'https://farm1.staticflickr.com/601/23039739019_62f97be5e1_n.jpg',
    caption: 'Dome'
  },
  {
    src: 'https://farm1.staticflickr.com/749/23325159451_23dde49dfd_k.jpg',
    size: '2048x626',
    msrc: 'https://farm1.staticflickr.com/749/23325159451_99408cc637_n.jpg',
    caption: 'Horticulture Domes'
  },
  {
    src: 'https://farm1.staticflickr.com/5676/23039741019_6961e4b701_k.jpg',
    size: '2048x1152',
    msrc: 'https://farm1.staticflickr.com/5676/23039741019_6be4d4e983_n.jpg',
    caption: 'Halestorm'
  },
  {
    src: 'https://farm1.staticflickr.com/589/23407719575_cd22381894_k.jpg',
    size: '1536x2048',
    msrc: 'https://farm1.staticflickr.com/589/23407719575_634d30b58f_n.jpg',
    caption: 'Lzzy'
  },
  {
    src: 'https://farm1.staticflickr.com/682/23381554166_21a37b03e9_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/682/23381554166_8d52d3c110_n.jpg',
    caption: 'Kickball'
  },
  {
    src: 'https://farm1.staticflickr.com/5759/22779353604_d4a3df4608_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/5759/22779353604_b179bf8c80_n.jpg',
    caption: '21st Birthday'
  },
  {
    src: 'https://farm1.staticflickr.com/5814/23325175331_45b5f34889_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/5814/23325175331_179376041f_n.jpg',
    caption: 'Lovely Smile'
  },
  {
    src: 'https://farm1.staticflickr.com/680/23325181051_086faab56c_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/680/23325181051_8f445bd68b_n.jpg',
    caption: 'Cub Picture'
  },
  {
    src: 'https://farm1.staticflickr.com/754/23111972930_19d4630326_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/754/23111972930_a7ba5f3ef2_n.jpg',
    caption: 'Sunshine'
  },
  {
    src: 'https://farm1.staticflickr.com/720/22779380094_b2806be222_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/720/22779380094_fd951af43a_n.jpg',
    caption: 'Shining Lights'
  },
  {
    src: 'https://farm1.staticflickr.com/670/22780587503_7f41467edd_k.jpg',
    size: '2048x1266',
    msrc: 'https://farm1.staticflickr.com/670/22780587503_aabbe4075b_n.jpg',
    caption: 'Outside Wrigly'
  },
  {
    src: 'https://farm1.staticflickr.com/583/23381597936_3bbae6618d_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/583/23381597936_451077f7c8_n.jpg',
    caption: 'Lucroy'
  },
  {
    src: 'https://farm1.staticflickr.com/630/23299295182_368fb4c1a3_k.jpg',
    size: '2048x1260',
    msrc: 'https://farm1.staticflickr.com/630/23299295182_e0f81b73ab_n.jpg',
    caption: 'Braun'
  },
  {
    src: 'https://farm1.staticflickr.com/635/23039803089_462d397203_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/635/23039803089_5ed6de9010_n.jpg',
    caption: 'Camera Guy'
  },
  {
    src: 'https://farm1.staticflickr.com/709/22780611703_17ac7e37c0_k.jpg',
    size: '2048x1216',
    msrc: 'https://farm1.staticflickr.com/709/22780611703_cac1dee1f2_n.jpg',
    caption: 'Blue Dock'
  },
  {
    src: 'https://farm1.staticflickr.com/5756/22780612953_55b06ca4d5_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/5756/22780612953_78da6eb9ec_n.jpg',
    caption: 'Streamers'
  },
  {
    src: 'https://farm1.staticflickr.com/5760/23039809719_4e7690032c_k.jpg',
    size: '2048x1365',
    msrc: 'https://farm1.staticflickr.com/5760/23039809719_32046ce5a1_n.jpg',
    caption: 'Sparklers'
  },
  {
    src: 'https://farm6.staticflickr.com/5664/22569126454_55fd8c781b_k.jpg',
    size: '1365x2048',
    msrc: 'https://farm6.staticflickr.com/5664/22569126454_bdcf19817e_n.jpg',
    caption: 'Hills'
  }
];


$.each(photos.list, function(index, item) {
  var size = item.size.split('x');
  item.w = size[0];
  item.h = size[1];
});