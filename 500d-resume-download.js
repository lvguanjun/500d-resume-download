// ==UserScript==
// @name         五百丁简历下载 (Modified Version)
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  五百丁简历通过打印方式转存为PDF (Modified by lvguanjun)
// @author       Original by 炎爷123 | Modified by lvguanjun
// @match        https://www.500d.me/newcvresume/edit/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    let print_btn = document.querySelector('#cvresumePrintBtn');
    print_btn.id = "download";
    print_btn.className = "header_print_btn";
    print_btn.addEventListener("click", function () {
        let css_path = this.getAttribute("data-css");
        var print_html = '<div class="printtips_img"></div>' +
            '<p>1、在打印设置中将边距设置为 <span>“无”</span></p>' +
            '<p>2、然后请勾选 <span>“背景图形”</span></p>';
        common.main.resume_confirm({
            title: "打印提示",
            content_html: print_html,
            modal_class: "resume_printtips_modal",
            ok: '知道了，去打印',
            onOk: function () {
                var version = new Date().getTime();
                // 打印时隐藏其他内容
                $("#resume_base .baseItem-toolbar").addClass("hidden");
                $("#resume_base .date_select").addClass("hidden");
                $("#resume_base .page_tips").addClass("hidden");
                $("#resume_base .auto_one_page").addClass("hidden");
                $("#resume_base").print({
                    globalStyles: false,//是否包含父文档的样式，默认为true
                    stylesheet: [
                        "/resources/500d/newcvresume/css/base_template.css?v=" + version,
                        "/resources/500d/newcvresume/css/parts_css.css?v=" + version,
                        "/resources/500d/newcvresume/css/export.css?v=" + version,
                        css_path + '?v=' + version,
                    ]//外部样式表的URL地址，默认为null
                });
                $("#resume_base .baseItem-toolbar").removeClass("hidden");
                $("#resume_base .date_select").removeClass("hidden");
                $("#resume_base .page_tips").removeClass("hidden");
                $("#resume_base .auto_one_page").removeClass("hidden");
            }
        });
    })

    // 解锁更换模板功能
    document.querySelector('#change_temlate_btn').className = "editor_operate_menu change_editor";
    // 解锁导入简历功能
    document.querySelector('#importResumeBtn').className = "editor_operate_menu import_editor";

})();