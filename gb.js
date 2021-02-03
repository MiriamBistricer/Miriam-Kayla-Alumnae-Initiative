	$(function() {
				var dialog,
				    form,

				// From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
				    emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
				    name = $("#name"),
				    email = $("#email"),
				    donation = $("#donation"),
				    credit = $("#cc"),
				    tips = $(".validateTips");

				function checkRegexp(o, regexp) {
					if (!( regexp.test(o.val()) )) {
						o.addClass("ui-state-error");
						return false;
					} else {
						return true;
					}
				}

				function updateTips(t) {
					tips.append(t + "<br />");
					/*.addClass( "ui-state-highlight" );*/
					setTimeout(function() {
						tips.removeClass("ui-state-highlight", 1500);
					}, 500);
				}

				function addUser() {
					var valid = true;
					$("#validateTips").empty();

					/*
					 valid = valid && checkRegexp( name, /^[a-z]([a-z_\s])+$/i, "Please enter a valid name." );
					 valid = valid && checkRegexp( email, emailRegex, "Please enter a valid email address." );
					 valid = valid && checkRegexp( donation, /\d\./ , "Please enter a valid donation amount.");
					 valid = valid && checkRegexp( credit,  /^\d{4}\d{4}\d{4}\d{4}$/ , "Please enter a valid credit card number." );
					 */
					if (!checkRegexp(name, /^[a-z]([a-z_\s])+$/i)) {
						valid = false;
						updateTips("Please enter a valid name.");
					}
					if (!checkRegexp(email, emailRegex)) {
						valid = false;
						updateTips("Please enter a valid email address.");
					}
					if (!checkRegexp(donation, /\d/)) {
						valid = false;
						updateTips("Please enter a valid donation amount.");
					}
					if (!checkRegexp(credit, /^\d{4}\d{4}\d{4}\d{4}$/)) {
						valid = false;
						updateTips("Please enter a valid credit card number.");
					}
					if ($("#exp").val() === "") {
						valid = false;
						updateTips("Please enter an expiration date.");
					}

					if (valid) {
						newDonation = parseFloat(document.getElementById("donation").value),
						donated = parseFloat(document.getElementById("total").textContent);
						donated += newDonation;
						$("#total").text(donated);

						dialog.dialog("close");
					}
					return valid;
				}

				dialog = $("#dialog-form").dialog({
					autoOpen : false,
					height : 500,
					width : 500,
					modal : true,
					buttons : {
						"Donate" : addUser
					},
					close : function() {
						form[0].reset();
						document.getElementById("hide").classList.toggle("off");
						document.getElementById("hide2").classList.toggle("off");
						tips.text("");
					}
				});

				form = dialog.find("form").on("submit", function(event) {
					event.preventDefault();
					addUser();
				});

				$("#donate").button().on("click", function() {
					document.getElementById("hide").classList.toggle("off");
					document.getElementById("hide2").classList.toggle("off");
					dialog.dialog("open");
				});

			});
			$(function() {
				$('.date-picker').datepicker({
					changeMonth : true,
					changeYear : true,
					showButtonPanel : true,
					dateFormat : 'MM yy',
					onClose : function(dateText, inst) {
						$(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
					}
				});
			});

	
		