






////////////////////////////////////////////////////////////////////////////////////////////////////
// jsonp 諛⑹떇�쇰줈 �쒕쾭�� �몄텧
//
// param string �ㅼ썙��
// param string 肄쒕갚硫붿뒪��
////////////////////////////////////////////////////////////////////////////////////////////////////
function _ryo_get_keyword_count(ps_keyword, ps_callback, ps_position)
{
	//alert(ps_keyword);
	if ( ! ps_keyword )
	{
		alert('寃��됱뼱媛� 鍮꾩뿀�듬땲��');
		return false;
	}


	var s_keyword = encodeURIComponent(ps_keyword.toUpperCase().replace(/ /g,'')); // 怨듬갚�쒓굅�섍퀬, �곷떒�댁씪寃쎌슦�뚮Ц�먮뒗��臾몄옄濡쒕컮袁멸퀬(�덇렇�쇨��됱삤瑜섎궓),�몄퐫�⑷퉴吏�..
	var j = document.createElement('script');

	
	var u = 'https://www.ryo.co.kr/naver/keyword?position=' + ps_position + '&callback=' + ps_callback + '&dn=&keyword=' + s_keyword;

	j.setAttribute('src', u);
	j.setAttribute('type', 'text/javascript');
	document.getElementsByTagName('body')[0].appendChild(j);

	sleep(200); // 0.4珥�

	return false;
}

function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}



function _ryo_dn2encode(param) {
	var r='';
	for ( var i=0; i<param.length; i++) {
		r+=param.charCodeAt(i);
		if (i<param.length-1) r+=',';
	}
	return encodeURIComponent(r);
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// 遺곷쭏�대┸�� �대┃�덉쓣 �� 理쒖큹 �ㅽ뻾�섎뒗 吏��먯엫
// �꾩옱 寃��됱뼱 議고쉶�� �뺤씤 / 異쒕젰
////////////////////////////////////////////////////////////////////////////////////////////////////

if ( ! document.getElementById('o_div_keycnt') ) // �대� 議고쉶�� 寃곌낵媛� 異쒕젰�섏뼱 �덉쑝硫� �ㅼ떆 議고쉶�섏� �딆쓬
{
	var s_naver_search_keyword = document.getElementById('nx_query').value; // 寃��됲뤌�� �곹엺 寃��됱뼱
	//alert(s_naver_search_keyword);
	_ryo_get_keyword_count(s_naver_search_keyword, 'set_keyword_cnt', 'main');
}


// jsonp 肄쒕갚
function set_keyword_cnt(po_json)
{
	_set_keyword_cnt_core(po_json);

	get_relate_keyword_cnt()
}

// �꾩옱 寃��됱뼱 議고쉶�� 異쒕젰
function _set_keyword_cnt_core(po_json)
{
	// 議고쉶��
	var o_div_keycnt = document.createElement('div');
	o_div_keycnt.id="o_div_keycnt";
	o_div_keycnt.innerHTML='<div id="keyword_cnt" style="display: inline-block; text-align: right; padding-bottom: 10px; font-weight: bold; color: blue;">' + po_json.relKeyword + ' &nbsp pc:' + po_json.monthlyPcQcCnt + ' &nbsp; m:' + po_json.monthlyMobileQcCnt + '</div>';

	// 議고쉶�� �붾㈃�� 異쒕젰
	//var o_div = document.getElementsByClassName('search_area')[0]; // 異쒕젰吏��� 吏���
	//o_div.appendChild(o_div_keycnt); // 異쒕젰
	document.querySelector('.lst_related_srch').prepend(o_div_keycnt);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// �곌�寃��됱뼱 議고쉶�� 異쒕젰
////////////////////////////////////////////////////////////////////////////////////////////////////
//var relate_keyword_index = 0;



// �꾩옱 寃��됱뼱 議고쉶�� 異쒕젰�� �ㅽ뻾�� �몃━嫄�
function get_relate_keyword_cnt()
{
	//li_2_table();

	_remove_max_height_related_keword_wrapper();
	_mv_top_related_keword_wrapper();

	var a_relate_keyword = _get_relate_keyword();

	var i = 0;
	var n_term = 250; // 0.2珥� (1珥�=1000)
	_recursive_call(a_relate_keyword, i, a_relate_keyword.length, n_term);

}

// �덈Т �먯＜ �ㅼ씠踰꾩뿉 �붿껌�섎㈃, �ㅼ씠踰꾧� �먮윭瑜� �댁꽌, �쒓컙 ���� ��
function _recursive_call(pa_relate_keyword, pn_index, pn_max, pn_term)
{
	setTimeout(
		function() {
			_ryo_get_keyword_count(pa_relate_keyword[pn_index], 'set_relate_keyword_cnt', 'relate');

			if (pn_index == pn_max-1)
			{
				return false;
			}

			pn_index++;
			_recursive_call(pa_relate_keyword, pn_index, pn_max, pn_term);
		},
		pn_term
	);
}

// 寃��됯껐怨쇱뿉�� �곌�寃��됱뼱瑜� 李얠븘�� 諛곗뿴濡� 由ы꽩
function _get_relate_keyword()
{

	var b_exist_bottom_relate_keyword = document.querySelector('.lst_related_srch div.tit') ? true : false;

	if ( b_exist_bottom_relate_keyword ) {

		var a_keyword = document.querySelectorAll('.lst_related_srch div.tit');
		var a_total_keyword = new Array();

		for ( var i in a_keyword ) {
			if ( a_keyword[i].innerText ) {
				s_keyword = a_keyword[i].innerText.replace(/ /g,'');
				a_total_keyword.push(s_keyword);
			}
		}

		//console.log(a_total_keyword);

		return a_total_keyword;
	}

	return false;
}

// �곌�寃��됱뼱 �곸뿭�� �믪씠�쒗븳 �놁빊
function _remove_max_height_related_keword_wrapper()
{
	document.querySelector('.lst_related_srch').style.maxHeight = 'none';
}

// 2020-11-02 �ㅼ씠踰� pc �듦��붾㈃�� 諛붾�뚮㈃��
// �섏씠吏� �섎떒�� 蹂댁씠�� �곌�寃��됱뼱 �곸뿭�� 留� �꾨줈 �щ━湲�
function _mv_top_related_keword_wrapper()
{
	var e_main = document.querySelector('#main_pack');
	var e_wrapper = document.querySelector('#nx_footer_related_keywords');

	e_main.prepend(e_wrapper);
}


/*
function _get_relate_keyword_old()
{

	var a_dd = document.getElementsByClassName('lst_relate')[0];

	if ( a_dd ) {
		var a_keyword = a_dd.getElementsByTagName('a');
		var s_keyword = '';
		var a_total_keyword = new Array();

		for ( var i in a_keyword ) {
			if ( a_keyword[i].innerText ) {
				s_keyword = a_keyword[i].innerText.replace(/ /g,'');
				a_total_keyword.push(s_keyword);
			}
		}

		return a_total_keyword;
	}

	return false;
}

function li_2_table()
{
	var a_dd = document.getElementsByClassName('lst_relate')[0];
	var a_li = a_dd.getElementsByTagName('li');

	var s_table = '<div style="padding-top: 20px;"><table class="table_relate_keyword" style="margin-top: 20px;">';
	for ( var i in a_li ) {
		//alert(a_li[i].innerHTML);

		if ( a_li[i].innerHTML ) // 留� �앸�遺꾩뿏 媛믪씠 鍮� li媛� �덉쓣 �� �덉뼱��, �� 議곌굔�� �ｌ� �딆쑝硫� td�덉뿉 undefine�대� 湲��먭� 異쒕젰�쒕떎
		{
			s_table += '<tr>';
			s_table += '<td class="relate_keyword_wrapper">' + a_li[i].innerHTML + '</td>';
			s_table += '</tr>';
		}
	}
	s_table += '</table></div>';

	//a_dd.innerHTML += s_table;
}
*/
