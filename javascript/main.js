jQuery(document).ready(function($) {
	// call layout
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	$("#modal").load("modal.html");

	// call slick slide
    $(".autoplay").each(function() {
        $(this).slick($(this).data());
    });

    // fixed menu
    (function($) {
        let menu = $('.fixed-main-menu');
        body = $('body,html');
        menuPosition = menu.offset().top;
        $(window).scroll(() => {
            let startpage = body.scrollTop();
            (startpage > menuPosition) ? (menu.addClass('fixed')) : (menu.removeClass('fixed'))
        });
    })($);
    // end fixed menu

    // load top
    (function($) {
        let up_btn = $("body .up");
        let body = $('body,html');
        up_btn.css({
            cursor: 'pointer'
        });
        up_btn.click(function() {
            $('html,body').animate({ scrollTop: 0 }, 1000);
        });
        $(window).scroll(function(event) {
            let startpage = body.scrollTop();
            if (startpage > 200) {
                up_btn.addClass('up-active');
            } else if (startpage < 200) {
                up_btn.removeClass('up-active');
            }
        });
    })($);
    // end load top

    // Effect accordion
    $(function() {
        $('.accordion .show-option').click(function(event) {
            event.preventDefault();
			$(this).parent().addClass('active');
			$(this).parent().siblings().removeClass('active');
			$(this).parent().siblings().find('.fretboard').slideUp();
			$(this).parent().find('.fretboard').slideToggle();
			$(this).parent().siblings().find('.show').removeClass('active').text('+');
			($(this).parent().find('.show').text() === '+') ? 
			($(this).parent().find('.show').removeClass('active').text('-')) : 
			($(this).parent().find('.show').addClass('active').text('+'))
        });
    });
    // end Effect accordion

    // Effect dropdown list
    $(function() {
        $('.dropdown .show-option').click(function(event) {
            event.preventDefault();
            $(this).parent().find('.fretboard').slideToggle();
        });
    });
    // end Effect accordion

    // Effect drop down
    (function($) {
        let box = $('body .inside');
        box.find('.drop-down').slideUp();
        $(document).mouseup(e => {
            if (!box.is(e.target) && box.has(e.target).length === 0) {
                box.find('.drop-down').slideUp();
            }
        });
        box.find('.command-button').on('click', function(event) {
            event.preventDefault();
            $(this).parent().siblings().find('.drop-down').slideUp();
            $(this).parent().find('.drop-down').slideToggle();
        });
    })($);
    // end Effect drop down

    // spinner quantity
    (function($) {
        $('.quantity').each(function() {
            let spinner = $(this),
                input = $('.quantity input[type="number"]'),
                btnUp = $('.quantity .quantity-up'),
                btnDown = $('.quantity .quantity-down'),
                min = input.attr('min'),
                max = input.attr('max');
            let newVal;
            btnUp.click(function() {
                let oldValue = parseFloat(input.val());
                if (oldValue >= max) {
                    newVal = oldValue;
                } else {
                    newVal = oldValue + 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });
            btnDown.click(function() {
                let oldValue = parseFloat(input.val());
                if (oldValue <= min) {
                    newVal = oldValue;
                } else {
                    newVal = oldValue - 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });
		});
	});
    //end

	// tabs
	$(function() {
		$(".magic-tabs  ul li").on('click', function() {
			var container_tab = $(this).closest('.cover-tab');
			container_tab.find('.tab-content .content').removeClass('active-tab-content');
			$(this).siblings().removeClass("action-tab-btn");
			$(this).addClass('action-tab-btn');
			container_tab.find('.tab-content .content').eq($(this).index()).addClass('active-tab-content');
		});	
	});
	// end tabs

	// modal form registor
	$(function() {
		// choose doctor
		let fakeData = [
			{"name": "Bác sĩ Nguyễn Tuấn Anh", "job": "Chuyên khoa Gây mê - Điều trị đau"},
			{"name": "Bác sĩ Nguyễn Duy Tân", "job": "Chuyên khoa nhi"},
			{"name": "Bác sĩ Nguyễn Tuấn Đạt", "job": "Chuyên khoa mắt"},
			{"name": "Bác sĩ Ngô Tiến Mạnh", "job": "Chuyên khoa cơ xương khớp"},
			{"name": "Bác sĩ Bùi Văn Tiến", "job": "Chuyên khoa răng hàm mặt"},
			{"name": "Bác sĩ Đinh Thùy Nga", "job": "Chuyên tai mũi họng"},
			{"name": "Bác sĩ Phan Thị Linh", "job": "Chuyên khoa Gây trĩ"},
			{"name": "Bác sĩ Phạm văn Cần", "job": "Chuyên khoa Gây phổi"},
			{"name": "Bác sĩ Nguyễn Tuấn Huy", "job": "Chuyên khoa Gây gan"}
		];

		function showVal(fakeData) {
			let listVal = fakeData.map(item => (`
				<div class="item">
					<p class="name">${item.name}</p>
					<span class="job"> - ${item.job}</span>
				</div>
			`))
			$('#list-results').html(listVal);
		}
		showVal(fakeData);

		$(".field-doctor").keyup(function(){
			let val = $(this).val().trim().toLowerCase();
			if(val === '') {
				showVal(fakeData);
				return;
			}
			let fakeDataChange = [];
			fakeData.forEach(item => {
				if(item.name.toLowerCase().indexOf(val) >= 0 || item.job.toLowerCase().indexOf(val) >= 0) {
					fakeDataChange.push(item);
				}
			})
			showVal(fakeDataChange);
		});

		$('body').on('click', '#list-results .item',function() {
			let text = $(this).children('.name').text() + $(this).children('.job').text();
			$(".field-doctor").val(text);
			console.log(text);
		});

		// choose date
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth()+1;
		let yyyy = today.getFullYear();
		if(dd<10) {
			dd='0'+dd;
		} if(mm<10) {
			mm='0'+mm;
		} 
		today = yyyy+'-'+mm+'-'+dd;
		$(".field-date").attr("min", today);
		$(".field-date").change(function() {
			$(this).parent().find('.result').text($(this).val());
			console.log($(this).text());
		});
	});
	// end modal form registor

	// show pass
	(function($) {
		let x = document.getElementById("pass");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
	});
	// end show pass
});
