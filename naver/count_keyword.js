// gpgp20200@gmail.com

//  Keyworkd Count


if (!document.getElementById('el_count')) {
	var el_naver_search_keyword = document.getElementById('nx_query').value;			// 검색 단어 얻기
	_get_count_keyword(el_naver_search_keyword, 'set_keyword_cnt', 'main');
}


async function _get_count_keyword(ps_keyword, ps_callback, ps_position)
{
	if ( !ps_keyword )
	{
		alert('Keyworkd가 없다');
		return false;
	}


	var s_keyword = encodeURIComponent(ps_keyword.toUpperCase().replace(/ /g, '')); // ps_keyword를 공백을 제거하고 UTF-8로 인코딩
	var j = document.createElement('script');		// 지정한 tagName (sctipt)의 HTML 요소를 만들어 반환

	
	var u = 'https://www.ryo.co.kr/naver/keyword?position=' + ps_position + '&callback=' + ps_callback + '&dn=&keyword=' + s_keyword;

	j.setAttribute('src', u);
	j.setAttribute('type', 'text/javascript');
	document.getElementsByTagName('body')[0].appendChild(j);

	await sleep(200);			// 비동기 슬립

	return false;
}

function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}


function set_keyword_cnt(po_json)
{
	var el_count = document.createElement('div');
	el_count.id ="el_count";
	el_count.innerHTML='<div id="keyword_cnt" style="display: inline-block; text-align: right; padding-bottom: 10px; font-weight: bold; color: blue;">'
				+ po_json.relKeyword + ' &nbsp pc:' 
				+ po_json.monthlyPcQcCnt + ' &nbsp; m:' + po_json.monthlyMobileQcCnt 
				+ '</div>';

	document.querySelector('.lst_related_srch').prepend(el_count);


	document.querySelector('.lst_related_srch').style.maxHeight = 'none';

	var e_main = document.querySelector('#main_pack');
	var e_wrapper = document.querySelector('#nx_footer_related_keywords');

	e_main.prepend(e_wrapper);
	

	var a_relate_keyword = _get_relate_keyword();

	var i = 0;
	var n_term = 250;
	_recursive_call(a_relate_keyword, i, a_relate_keyword.length, n_term);
}


function _recursive_call(pa_relate_keyword, pn_index, pn_max, pn_term)
{
	setTimeout(
		function() {
			_get_count_keyword(pa_relate_keyword[pn_index], 'set_relate_keyword_cnt', 'relate');

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

