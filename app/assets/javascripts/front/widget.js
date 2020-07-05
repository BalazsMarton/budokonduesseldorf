document.addEventListener("turbolinks:load", function() {
    if (app.dataset.controller == 'pages' && app.dataset.action == 'booking'){

        var SimplybookWidget = function (options) {
            this.options = {
                // common options
                'widget_type': 'iframe',
                'theme': 'default',
                'theme_settings': {},
                'app_config': {},
                'timeline': null,
                'datepicker': null,
                'url': '',
                // iframe widget options
                'iframe_postpone': false,
                // button widget options
                'button_position': 'right',
                'button_position_offset': 'auto',
                'button_background_color': '#06acee',
                'button_text_color': '#ffffff',
                'button_title': 'Book Now',
                'button_preload': true,
                'button_custom_id': null,
                'navigate': 'book'
            };
            this.modalsPositions = {};
            this.name = 'widget_' + Math.random();
            this.frame = null;
        
            for (var name in options) {
                if (!options.hasOwnProperty(name)) {
                    continue;
                }
                this.options[name] = options[name];
            }
        
            this.init();
        };
        
        SimplybookWidget.prototype.init = function () {
            if (!this.options.postpone) {
                switch (this.options.widget_type) {
                    case 'iframe':
                        this.displayIframe();
                        break;
        
                    case 'reviews':
                        this.options.navigate = 'reviews';
                        this.displayIframe();
                        break;
        
                    case 'button':
                        this.addButton();
                        break;
        
                    case 'contact-button':
                        this.addContactButton();
                        break;
                }
            }
        };
        
        SimplybookWidget.prototype.onReceiveMessage = function (message) {
            if (typeof message.data === 'object') {
                if (!this.frame || message.source !== this.frame.contentWindow) {
                    return;
                }
                switch (message.data.event) {
                    case 'appReady':
                        this.setSettings(message.data);
                        break;
                    case 'updateWidgetSize':
                        this.updateWidgetSize(message.data);
                        break;
                    case 'closeWidget':
                        this.closePopup();
                        break;
                    case 'modalShown':
                        if (this.options.widget_type === 'iframe') {
                            this.changeModalPosition(message.data.listener_id);
                        }
                        break;
                    case 'modalShow':
                        if (this.options.widget_type === 'iframe') {
                            this.saveModalPosition(message.data.listener_id);
                        }
                        break;
                    case 'modalHidden':
                        if (this.options.widget_type === 'iframe') {
                            this.updatePositionAfterModal(message.data.listener_id);
                        }
                        break;
                    case 'stepChanged':
                    case 'scrollTo':
                        if (this.options.widget_type === 'iframe') {
                            this.scrollToContent(message.data.content_position);
                        }
                        break;
                }
            }
        };
        
        SimplybookWidget.prototype.setSettings = function () {
            var win = this.frame.contentWindow || this.frame;
        
            var postData = {
                'update_config': true,
                'update_theme_vars': true,
                'theme_vars': this.options.theme_settings,
                'config_vars': this.options.app_config,
            };
        
            if(this.options.navigate){
                postData['navigate'] = this.options.navigate;
                this.options.navigate = null;
            }
        
            if(this.options.reviews_count || this.options.hide_add_reviews){
                postData['reviews_vars'] = {
                    "reviews_count": this.options.reviews_count,
                    "hide_add_reviews": parseInt(this.options.hide_add_reviews)
                };
            }
        
            win.postMessage(postData, '*');
        };
        
        SimplybookWidget.prototype.navigate = function (to) {
            var win = this.frame.contentWindow || this.frame;
        
            win.postMessage({
                'navigate': to
            }, '*');
        };
        
        SimplybookWidget.prototype.scrollToContent = function (contentPos) {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var iframePosition = this.frame.getBoundingClientRect();
        
            var top = scrollTop + iframePosition.top + contentPos;
        
            if (scrollTop > top) {
                window.scrollTo(0, top);
            }
        };
        
        SimplybookWidget.prototype.changeModalPosition = function (listenerId) {
            if (this.modalsPositions[listenerId]) {
                window.scrollTo(0, this.modalsPositions[listenerId]);
            }
        
            var win = this.frame.contentWindow || this.frame;
        
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var iframePosition = this.frame.getBoundingClientRect();
        
            var top = scrollTop + iframePosition.top;
            var scrollTo = scrollTop - top;
        
            win.postMessage({
                'update_modal_position': true,
                'listener_id': listenerId,
                'top': Math.max(scrollTo, 0)
            }, '*');
        };
        
        SimplybookWidget.prototype.saveModalPosition = function (listenerId) {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
            this.modalsPositions[listenerId] = scrollTop;
        };
        
        SimplybookWidget.prototype.updatePositionAfterModal = function (listenerId) {
            if (this.modalsPositions[listenerId]) {
                window.scrollTo(0, this.modalsPositions[listenerId]);
            }
        };
        
        SimplybookWidget.prototype.getUrl = function () {
            var widget_type = this.options.widget_type;
            if (widget_type == 'contact-button') {
                widget_type = 'button';
            }
        
            var url = this.options.url + '/v2/?widget-type=' + widget_type + '&theme=' + this.options.theme;
            if (this.options.theme) {
                url += '&theme=' + this.options.theme;
            }
            if (this.options.theme_id) {
                url += '&theme_id=' + this.options.theme_id;
            }
            if (this.options.timeline) {
                url += '&timeline=' + this.options.timeline;
            }
            if (this.options.datepicker) {
                url += '&datepicker=' + this.options.datepicker;
            }
            if (this.options.is_rtl) {
                url += '&is_rtl=1';
            }
            return url;
        };
        
        SimplybookWidget.prototype.subscribeMessages = function () {
            var instance = this;
            window.addEventListener("message", function (data) {
                instance.onReceiveMessage(data);
            }, false);
        };
        
        // iframe widget methods
        SimplybookWidget.prototype.updateWidgetSize = function (data) {
            if (this.options.widget_type !== 'iframe' && this.options.widget_type !== 'reviews') {
                return;
            }
            this.frame.height = data.height;
        };
        
        SimplybookWidget.prototype.displayIframe = function () {
            document.getElementById('simplybook-widget-wrap').innerHTML = '<iframe scrolling="no" class="sb-widget-iframe" width="100%" border="0" frameborder="0" src="' + this.getUrl() + '" name="' + this.name + '" id="' + this.name + '"></iframe>';
            this.frame = document.getElementById(this.name);
        
            this.subscribeMessages();
        };
        
        // button widget methods
        SimplybookWidget.prototype.addButton = function () {
            this.addButtonWidgetStyles();
        
            var btn;
            if (this.options.button_custom_id) {
                btn = document.getElementById(this.options.button_custom_id);
            } else {
                btn = this.getButtonNode();
            }
        
            var instance = this;
            btn.addEventListener('click', function () {
                instance.showPopupFrame('book');
            });
        
            if(!this.options.button_custom_id) {
                document.body.appendChild(btn);
            }
        };
        
        SimplybookWidget.prototype.addContactButton = function () {
            this.addButtonWidgetStyles();
        
            var btn;
            if (this.options.button_custom_id) {
                btn = document.getElementById(this.options.button_custom_id);
            } else {
                btn = this.getButtonNode();
            }
        
            var instance = this;
            btn.addEventListener('click', function () {
                instance.showPopupFrame('contact-widget');
            });
        
            if(!this.options.button_custom_id) {
                document.body.appendChild(btn);
            }
        };
        
        SimplybookWidget.prototype.getButtonNode = function () {
            this.btn = document.createElement('div');
            this.btnLabel = document.createElement('div');
            this.btnLabel.innerText = this.options.button_title;
        
            this.btn.appendChild(this.btnLabel);
        
            this.updateButtonStyles();
        
            return this.btn;
        };
        
        SimplybookWidget.prototype.updateButtonStyles = function (options) {
            if (!this.btn) {
                return;
            }
            if (options) {
                this.options.button_position = options.button_position;
                this.options.button_background_color = options.button_background_color;
                this.options.button_text_color = options.button_text_color;
                this.options.button_position_offset = options.button_position_offset;
                this.options.button_title = options.button_title;
            }
        
            this.btn.className = 'simplybook-widget-button ' + this.options.button_position;
            this.btn.style.backgroundColor = this.options.button_background_color;
            this.btn.style.color = this.options.button_text_color;
            if (this.options.button_position === 'top' || this.options.button_position === 'bottom') {
                this.btn.style.right = this.options.button_position_offset;
                this.btn.style.bottom = '';
            } else {
                this.btn.style.bottom = this.options.button_position_offset;
                this.btn.style.right = '';
            }
            this.btnLabel.innerText = this.options.button_title;
        };
        
        SimplybookWidget.prototype.resetWidget = function (options) {
            this.options = options;
        
            this.updateButtonStyles(options);
        
            this.container = null;
            this.frame = null;
        };
        
        SimplybookWidget.prototype.showPopupFrame = function (navigateTo) {
            if (navigateTo === undefined) {
                navigateTo = 'book';
            }
        
            if (!this.container) {
                this.container = document.createElement('div');
                this.container.className = 'simplybook-widget-container active';
        
                this.options.navigate = navigateTo;
                this.container.appendChild(this.getIframeNode());
        
                document.body.appendChild(this.container);
            } else {
                this.container.className = 'simplybook-widget-container active';
                this.navigate(navigateTo);
            }
        
            this.showOverlay();
        };
        
        SimplybookWidget.prototype.closePopup = function () {
            this.hideOverlay();
            this.container.className = 'simplybook-widget-container';
        };
        
        SimplybookWidget.prototype.showOverlay = function () {
            if (!this.overlay) {
                this.overlay = document.createElement('div');
                this.overlay.className = 'simplybook-widget-overlay';
        
                var instance = this;
                this.overlay.addEventListener('click', function () {
                    instance.closePopup();
                });
            }
        
            document.body.appendChild(this.overlay);
        
            var instance = this;
            // to show animated appear
            setTimeout(function () {
                instance.overlay.className = instance.overlay.className + ' active';
            }, 10);
        };
        
        SimplybookWidget.prototype.hideOverlay = function () {
            if (this.overlay) {
                this.overlay.className = 'simplybook-widget-overlay';
        
                var instance = this;
                setTimeout(function () {
                    document.body.removeChild(instance.overlay);
                }, 300);
            }
        };
        
        SimplybookWidget.prototype.addButtonWidgetStyles = function () {
            var link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', this.options.url + '/v2/widget/widget.css');
        
            document.getElementsByTagName('head')[0].appendChild(link);
        };
        
        SimplybookWidget.prototype.getIframeNode = function () {
            if (!this.frame) {
                this.frame = document.createElement('iframe');
                this.frame.border = '0';
                this.frame.frameBorder = '0';
                if (this.options.widget_type == 'iframe') {
                    this.frame.scrolling = 'no';
                }
                this.frame.name = this.name;
                this.frame.id = this.name;
                this.frame.src = this.getUrl();
        
                this.subscribeMessages();
            }
        
            return this.frame;
        };
        
        var widget = new SimplybookWidget({
            "widget_type":"iframe",
            "url":"https:\/\/tesztelo.simplybook.it",
            "theme":"simple_beauty_theme",
            "theme_settings":{
                "sb_base_color":"#c8ab2d",
                "header_color":"#ffffff",
                "timeline_hide_unavailable":"0",
                "timeline_show_end_time":"0",
                "timeline_modern_display":"as_slots",
                "display_item_mode":"block",
                "body_bg_color":"#ffffff",
                "dark_font_color":"#474747",
                "light_font_color":"#ffffff",
                "sb_company_label_color":"#333333",
                "hide_img_mode":"1",
                "show_sidebar":"1","sb_busy":"#dad2ce",
                "sb_available":"#d3e0f1"
            },
            "timeline":"flexible",
            "datepicker":"top_calendar",
            "is_rtl":false,
            "app_config":{
                "predefined":{
                    "provider":"1"
                }
            }
        });
    }
})
