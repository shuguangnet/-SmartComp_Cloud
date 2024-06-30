$(function() {
  var hasIndex, index;
  hasIndex = window.location.href.split("?").length > 1;
  index = hasIndex ? window.location.href.split("?")[1].split("=")[1] : 0;


  var data = [
    //第一本书
    {
      //书的信息
      BookInformation: {
        bookName: "计算机设计大赛",
        author: "中国大学生计算机设计大赛组织委员会",
        press: "北京语言大学信息科学学院",
        year: "2024-07",
        price: "15.00",
        Binding: "精装",
        folio: "16",
        ISBN: "9787539189437",
        imgUrl: "https://jsjds.blcu.edu.cn/__local/9/B7/B5/F983196ED5E3A13DD2095F6EECB_1DBEC36F_996FF.png",
        authorIntro: `
				SmartCare是一款智能健康管理系统，旨在通过大数据和人工智能技术，为用户提供个性化的健康建议和管理方案。项目包括以下主要功能：健康数据监测,个性化建议,远程医疗： 连接用户与专业医生，提供在线咨询和远程医疗服务。前端使用React框架实现动态、响应式的用户界面。
后端使用Node.js和Django框架，结合MySQL和MongoDB数据库，确保数据的高效存储和处理。数据分析：使用TensorFlow和scikit-learn进行健康数据的智能分析和预测。
“参加计算机设计大赛是一次难得的体验，我们不仅提升了技术能力，还学会了如何更好地团队合作。感谢大赛提供的平台和机会，让我们能够展示自己的创意和技术，也非常感谢评委们的肯定。未来，我们将继续努力，不断创新，为用户提供更好的技术解决方案。”

`,
        //图书标签
        bookLabel: ['竞赛', '计算机', '团队合作', '软件开发', '经典'],
        //主题词
        themaWords: ['软件开发', '设计'],
        //内容提要
        contentSummary: '比赛旨在挑战参赛者的创造力和技术能力，展示他们在计算机科学和设计领域的才华。无论你是编程高手、用户体验设计师还是创新的硬件工程师，这个比赛都为你提供了展示和发挥才能的平台。',
        //本书目录
        catalogues: ['注册截止日期', '团队组建确认', '项目主题选择', '提交完整的代码', '设计文档准备', '用户手册编写', '演示视频录制', '初步评审安排', '评审标准公布', '半决赛入围通知', '现场展示准备', '答辩时间安排', '决赛入围名单公布', '决赛展示准备', '颁奖典礼筹备','获奖作品展示安排'],
      },
      //同类书籍
      similarBook: [
        {
          bookName: "ACM国际大学生程序设计竞赛",
          author: "美国计算机协会",
          press: "纽约",
          year: "2016-09",
          ISBN: "9787550016903",
          imgUrl: "https://img.pqblog.com/i/2024/06/20/004632.png",
        },
        {
          bookName: "中青杯全国大学生数学建模竞赛",
          author: "中国国际科技促进会综合素质与职业发展教育专业委",
          press: "吉林省科技教育学会、山东北斗教育研究院",
          year: "2007-10",
          ISBN: "9787539139340",
          imgUrl: "https://img.pqblog.com/i/2024/06/19/235936.png"
        },
        {
          bookName: "“挑战杯”全国大学生课外学术科技作品竞赛",
          author: "教育部、共青团中央、中国科学技术协会",
          press: "教育部、共青团中央、中国科学技术协会",
          year: "2010-07",
          ISBN: "9787539037080",
          imgUrl: "https://img.pqblog.com/i/2024/06/20/000140.png"
        },
        {
          bookName: "中国国际“互联网+”大学生创新创业大赛",
          author: "教育部、中央统战部、中央网络安全和信息化委员会办公室",
          press: "教育部、中央统战部、中央网络安全和信息化委员会办公室",
          year: "2015-06",
          ISBN: "9787540472252",
          imgUrl: "https://img.pqblog.com/i/2024/06/20/000309.png"
        },
        {
          bookName: "全国大学生电子设计竞赛",
          author: "教育部、工业和信息化部人教司",
          press: "教育部、工业和信息化部人教司",
          year: "2015-08",
          ISBN: "9787540472238",
          imgUrl: "https://img.pqblog.com/i/2024/06/20/001045.png"
        },

      ],
"PurchaseRe": [
    {
      "libraryName": "全球人工智能创新大会",
      "address": "中国北京市"
    },
    {
      "libraryName": "国际数学奥林匹克",
      "address": "不同国家轮流举办"
    },
    {
      "libraryName": "世界技能大赛",
      "address": "不同国家轮流举办"
    },
    {
      "libraryName": "世界自然科学奖",
      "address": "不同国家轮流举办"
    },
    {
      "libraryName": "国际大学生程序设计竞赛（ICPC）",
      "address": "不同国家轮流举办"
    },
    {
      "libraryName": "世界创新科技大会",
      "address": "新加坡"
    }
  ],
  "borrowRe": [
    {
      "libraryName": "国际青少年科学奥林匹克",
      "address": "不同国家轮流举办"
    },
    {
      "libraryName": "国际物理奥林匹克",
      "address": "不同国家轮流举办"
    }
  ],
      comment: [
				{
					"userName": "匿名用户",
					"time": "2024-06-20 09:45:32",
					"good": 12,
					"bad": 0,
					"con": "互联网+大赛真是一个绝佳的平台，不仅锻炼了我们的编程技能，还激发了我们创新思维。通过团队合作，我们成功开发了一款新颖的应用程序，获得了评委们的高度评价。期待下一次参赛！"
				},
				{
					"userName": "无昵称",
					"time": "2024-06-22 14:30:10",
					"good": 30,
					"bad": 2,
					"con": "第一次参加计算机设计大赛，收获颇丰。不仅学到了很多新技术，还认识了一群志同道合的朋友。比赛过程中不断挑战自我，最终取得了不错的成绩，真是一次难忘的经历。"
				},
				{
					"userName": "办办",
					"time": "2024-06-25 18:50:45",
					"good": 25,
					"bad": 1,
					"con": "挑战杯给了我们一个展示创新想法的平台。通过这个比赛，我们的团队不仅深入了解了项目管理，还提升了实际动手能力。非常感谢组委会的精心组织，让我们有机会展示自我，突破自我。"
				},
				{
					"userName": "匿名用户",
					"time": "2024-07-01 11:15:33",
					"good": 19,
					"bad": 3,
					"con": "蓝桥杯是一个极好的锻炼平台。比赛题目覆盖广泛，从基础到高级都有涉及。通过这次比赛，我的算法能力得到了极大的提升，也对未来的学习方向有了更明确的认识。"
				},
				{
					"userName": "VIP用户",
					"time": "2024-07-03 20:22:10",
					"good": 15,
					"bad": 0,
					"con": "互联网+大赛不仅仅是一个比赛，更是一个学习和成长的过程。在这个过程中，我学会了如何更有效地团队协作，也掌握了许多前沿的技术。希望未来能有更多这样的机会来挑战自我。"
				},
				{
					"userName": "CodeMaster",
					"time": "2024-07-05 08:35:20",
					"good": 10,
					"bad": 2,
					"con": "计算机设计大赛的经历非常宝贵。我们团队从初赛到决赛一路走来，克服了许多技术难题，最终获得了不小的成就感。非常感谢老师和队友们的支持与帮助。"
				}
			]
			


    },


 
  ]
  //同类书籍
  var renderSimilarBook = function(index) {
    var smailarLen = data[index].similarBook.length;
    var html = "";
    var imgUrl;

    for (let i = 0; i < smailarLen; i++) {
      imgUrl = data[index].similarBook[i].imgUrl;
      imgUrl = imgUrl === './fourImg/20000.jpg' ? './fourImg/404.svg' : imgUrl;

      html +=
        "<li>" +
        '<img class="fl" src="' +
        imgUrl +
        '" alt="">' +
        '<dl class="fl">' +
        "<dt>" +
        data[index].similarBook[i].bookName +
        "</dt>" +
        "<dd>" +
        "<p>作者: " +
        data[index].similarBook[i].author +
        "</p>" +
        "<p>出版社: " +
        data[index].similarBook[i].press +
        "</p>" +
        "<p>出版年: " +
        data[index].similarBook[i].year +
        "</p>" +
        "<p>ISBN: " +
        data[index].similarBook[i].ISBN +
        "</p>" +
        "</dd>" +
        "</dl>" +
        "</li>";
    }
    $(".aside-left ul").html(html);
  };

  // 书的信息
  var renderBookInfo = function(index) {
    var html =
      '<img class="fl" src="' +
      data[index].BookInformation.imgUrl +
      '" alt="">' +
      '<dl class="fl">' +
      "<dt>" +
      data[index].BookInformation.bookName +
      "</dt>" +
      "<dd>" +
      "<p>作者: " +
      data[index].BookInformation.author +
      "</p>" +
      "<p>出版社: " +
      data[index].BookInformation.press +
      "</p>" +
      "<p>出版年: " +
      data[index].BookInformation.year +
      "</p>" +
      "<p>定价: " +
      data[index].BookInformation.price +
      "元</p>" +
      "<p>装帧: " +
      data[index].BookInformation.Binding +
      "</p>" +
      "<p>开本: " +
      data[index].BookInformation.folio +
      "开</p>" +
      "<p>ISBN: " +
      data[index].BookInformation.ISBN +
      "</p>" +
      "</dd>" +
      "</dl>";

    $(".middle_con .middle_top .con_left").html(html);
  };

  //图书标签
  var renderBookLabel = function(index) {
    var html = "";

    var bookLabelLen = data[index].BookInformation.bookLabel.length;

    for (let i = 0; i < bookLabelLen; i++) {
      html += " <li>" + data[index].BookInformation.bookLabel[i] + "</li>";
    }

    $(".middle_con .middle_top .con_right .bookLabel").html(html);
  };

  //主题推荐
  var renderBookSubject = function(index) {
    var themLen = data[index].BookInformation.themaWords.length;
    var html = "";

    for (let i = 0; i < themLen; i++) {
      html += "<li>" + data[index].BookInformation.themaWords[i] + "</li>";
    }

    $(".middle_con .middle_top .con_right .themaWords").html(html);
  };

  // 内容提要
  var renderContentSummary = function(index) {
    $(".middle_con .middle_top .con_link .link_con").text(
      data[index].BookInformation.contentSummary
    );
  };

  //本书目录、作者
  var renderBookCatalog = function(index) {
    var len, html;
    len = data[index].BookInformation.catalogues.length;
    html = "";

    for (let i = 0; i < len; i++) {
      html += " <li>" + data[index].BookInformation.catalogues[i] + "</li>";
    }
    $(".middle_con .middle_top .con_link .link_ul").html(html);
    /* 本书作者 */
    $(".middle_con .middle_top .con_link .link_author").html(
      data[index].BookInformation.authorIntro
    );
  };

  // 购买推荐
  var renderRecommend = function(index) {
    var len, html;
    len = data[index].PurchaseRe.length;
    html = "";

    for (let i = 0; i < len; i++) {
      html +=
        '<dl class="clearfix">' +
        "<dt >" +
        '<span class="number">' +
        (i + 1) +
        ":" +
        "</span>" +
        '<span class="title">' +
        data[index].PurchaseRe[i].libraryName +
        "</span>" +
        "</dt>" +
        "<dd>地址: " +
        data[index].PurchaseRe[i].address +
        "</dd>" +
        "</dl>";
    }
    $(".middle_button .button_left .button_con .purchase").html(html);
  };

  //借阅推荐
  var renderBorrowRecommend = function(index) {
    var len, html;
    len = data[index].borrowRe.length;
    html = "";

    for (let i = 0; i < len; i++) {
      html +=
        '<dl class="clearfix">' +
        "<dt >" +
        '<span class="number">' +
        (i + 1) +
        ":" +
        "</span>" +
        '<span class="title">' +
        data[index].borrowRe[i].libraryName +
        "</span>" +
        "</dt>" +
        "<dd>地址: " +
        data[index].borrowRe[i].address +
        "</dd>" +
        "</dl>";
    }
    $(".middle_button .button_right .button_con .jieyue").html(html);
  };

  // 图书评论
  var renderBookComment = function(index) {
    var len, html;
    len = data[index].comment.length;
    html = "";

    for (let i = 0; i < len; i++) {
      html +=
        '<dl class="clearfix">' +
        '<dt class="clearfix">' +
        '<div class="fl user">' +
        "<p>" +
        data[index].comment[i].userName +
        "</p>" +
        '<p class="time">' +
        data[index].comment[i].time +
        "</p>" +
        "</div>" +
        '<div class="fr comment">' +
        '<span class="comment_one iconfont icon-pinglun">' +
        data[index].comment[i].bad +
        "</span>" +
        '<span class="iconfont icon-xin">' +
        data[index].comment[i].good +
        "</span>" +
        "</div>" +
        "</dt>" +
        '<dd class="clearfix">' +
        data[index].comment[i].con +
        "</dd>" +
        "</dl>";
    }
    $(".aside-right .aside_con").html(html);
  };

  /* 渲染页面 */
  var renderBookDetail = function(index) {
    renderSimilarBook(index);
    renderBookInfo(index);
    renderBookLabel(index);
    renderBookSubject(index);
    renderContentSummary(index);
    renderBookCatalog(index);
    renderRecommend(index);
    renderBorrowRecommend(index);
    renderBookComment(index);
  };
  renderBookDetail(index);

  var showSimilarBookInfo = function() {
    var similarBook = $(".aside-left>ul");

    similarBook.on("click", 'li', function(el) {
      var curItem = $(el.currentTarget);
      var bookName = curItem.find('dt').text().trim();
      var hasBook = false;
      var index = 0;

      for(var i = 0; i < data.length; i++) {
        if (data[i]["BookInformation"]["bookName"] === bookName) {
          index = i;
          hasBook = true;
          break;
        }
      }

      if (hasBook) renderBookDetail(index);

    });
  };

  showSimilarBookInfo();

  // 畅销书排行榜获取高度
  var rankH = $(".con li:nth-child(2) .book-rank").height();
  var rankShowH = 3.5 * rankH;
  var overHiddenH = rankH * 5 + rankShowH;
  $(".book-show").css("height", rankShowH + "px");
  var curBookRank = $(".aside-left li.active .book-rank");
  curBookRank.css("height", rankH + "px");

  //   获取行高
  var topSpan = $(".aside-left .top .book-rank span");
  var topSpanH = topSpan.height();
  topSpan.css("line-height", topSpanH + "px");

  var bottomSpan = $(".aside-left .bottom .book-rank span");
  var bottomSpanH = bottomSpan.height();
  bottomSpan.css("line-height", bottomSpanH + "px");

  //   获取各地区销售码洋排行高度
  var areaRankBox = $(".aside-right .area-rank .con");
  var areaRankH = areaRankBox.height();
  var areaRankLiH = Math.round(areaRankH / 3);
  areaRankBox.find("li").css("height", areaRankLiH + "px");
  var areaUl = areaRankBox.children("ul");

  var areaUlH = areaUl.height();
  // 定时动画效果
  // 销售码洋排行
  var num = 0;
  setInterval(function() {
    num++;
    num > 4 ? (num = 0) : num;
    areaUl.css("top", -(num * areaRankH) + "px");
  }, 2000);
  //   同类图书
  function fanzhuan(parent, children, num, time, state) {
    clearInterval(parent.timer);

    var pressNum = -1;

    var rankbUl = $(parent);
    var rankbLen = rankbUl.children().length;
    parent.timer = setInterval(function() {
      pressNum++;

      if (pressNum >= num) {
        if (!state) {
          $(children).hide();
        }
      }
      if (pressNum > rankbLen) {
        pressNum = -1;
        if (!state) {
          $(children).show();
        }
      }
      // console.log(pressNum)
      var curLi = rankbUl.children().eq(pressNum);
      // console.log(curLi);
      if (state) {
        curLi.addClass("pressRotate");
        curLi.siblings().removeClass("pressRotate");
      }
    }, time);
  }
  fanzhuan(".aside-left  ul", ".aside-left  li:lt(5)", 5, 1500, true);
  fanzhuan(
    ".aside-right .con_top .aside_con",
    ".aside-right .con_top .aside_con dl:lt(3)",
    2,
    1000
  );
  // fanzhuan('.aside-right .con_button .aside_con', '.aside-right .con_button .aside_con dl:lt(3)', 2,800)

  // 推荐
  function translate($dom, $childrenFirst) {
    var $uList = $($dom);
    var timer = null;
    //触摸清空定时器
    $uList
      .hover(
        function() {
          clearInterval(timer);
        },
        function() {
          //离开启动定时器
          timer = setInterval(function() {
            scrollList($uList);
          }, 1000);
        }
      )
      .trigger("mouseleave"); //自动触发触摸事件

    //滚动动画
    function scrollList(obj) {
      //获得当前<li>的高度
      var scrollHeight = $($childrenFirst).height();
      //滚动出一个<li>的高度
      $uList.stop().animate(
        {
          marginTop: -scrollHeight
        },
        600,
        function() {
          //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
          $uList
            .css({
              marginTop: 0
            })
            .find("dl:first")
            .appendTo($uList);
        }
      );
    }
  }

  translate(
    ".button_left .button_con .container",
    ".button_left .button_con .container dl:first"
  );
  translate(
    ".button_right .button_con .container",
    ".button_right .button_con .container dl:first"
  );
  //   畅销书排行
  var ranktUl = $(".aside-left .top ul");
  var bookLiLen = ranktUl.children().length;

  var bookNum = 0;

  var timer01 = setInterval(function() {
    bookNum++;
    // debugger
    if (bookNum % 5 == 0) {
      $(".aside-left .top li:lt(" + bookNum + ")").hide();
    }

    if (bookNum == bookLiLen) {
      bookNum = 0;
      ranktUl.children().show();
    }

    ranktUl.children().removeClass("active");
    ranktUl
      .children()
      .eq(bookNum)
      .addClass("active");

    ranktUl.find(".book-show").hide();
    ranktUl
      .children()
      .eq(bookNum)
      .children(".book-show")
      .show();
  }, 2000);
});


