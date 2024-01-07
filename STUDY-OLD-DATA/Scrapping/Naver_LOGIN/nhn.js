sessionkey = 'S2urb9JCCGmPi9k1';
keyname = '100011621';
evalue = '872dca4248c0df378f437695f408ed0155df7bcb33e682a936d724128fd7a9c9840666d68c55cfbc840f93739918599915a9f6e8eea92b05d1a331c43379949c6fa881b22945c8d9a3f88bf985bbe4ae25b60fa5f1095bbc64392585882de1b4bae542fe1cd87631c6129260d05fd263eebbcc6c8bb1093f2e598a328e7a54bb';
nvalue = '010001';
$('encnm').value = '100011621';
if (!sessionkey || !keyname || !evalue || !nvalue) { 
//if (true) { 
	if ($('enctp').value == 3) { 
		showErrorDiv2(4); 
	} else { 
		showErrorDiv(4); } 
	} else { 
		var rsa = new RSAKey(); 
		rsa.setPublic(evalue, nvalue); 
		$('encpw').value = rsa.encrypt(getLenChar(sessionkey) + 
							sessionkey + 
							getLenChar($('id').value) + 
							$('id').value + 
							getLenChar($('pw').value) + 
							$('pw').value); 
							$('pw').value = "";
							$('id').value = ""; 
							$('frmNIDLogin').submit();
	}