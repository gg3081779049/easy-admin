import en from 'element-plus/dist/locale/en.mjs'

export default {
    ...en,
    dict: {},
    'system': {
        'title': 'Easy-Admin',
        'copyright': 'Copyright © 2024 Easy-Admin All Rights Reserved.',
        'watermark': 'Easy-Admin',
    },
    'common': {
        'back': 'Back',
        'backtop': 'Backtop',
        'systemTip': 'System Tip',
        'backHome': 'Back Home',
        'relogin': 'Relogin',
        'logout': 'Logout',
        'confirm': 'Confirm',
        'cancel': 'Cancel',
        'search': 'Search',
        'reset': 'Reset',
        'select': 'Select',
        'add': 'Add',
        'delete': 'Delete',
        'export': 'Export',
        'update': 'Update',
        'drag': 'Drag',
        'operation': 'Operation',
        'refresh': 'Refresh',
        'expand': 'Expand',
        'collapse': 'Collapse',
        'fullscreen': 'Fullscreen',
        'exitFullscreen': 'Exit Fullscreen',
        'validate': 'Please Complete Security Verification',
        'userCenter': 'User Center',
        'configuration': 'Configuration',
    },
    'placeholder': {
        "captcha": "Please enter the correct captcha",
        'enterIconName': 'Please enter icon name',
        'selectIcon': 'Please select icon',
        'search': 'Search'
    },
    'operation': {
        'closeCurrent': 'Close Current',
        'closeOthers': 'Close Others',
        'closeLeft': 'Close Left',
        'closeRight': 'Close Right',
        'closeAll': 'Close All',
        'save': 'Save',
        'reset': 'Restore'
    },
    'message': {
        'loginSuccess': 'Login Successfully',
        'operationSuccess': 'Operation Successfully',
        'addSuccess': 'Add Success',
        'deleteSuccess': 'Delete Success',
        'updateSuccess': 'Update Success',
        'validateSuccess': 'Validate Success',
        'validateFailed': 'Validate Failed',
        'copied': 'Copied',
        'loading': 'Loading...',
        'welcomeBack': 'Welcome back',
        'captchaSliderTip': 'Hold down the left button and drag',
        'captchaPickTip': 'Click in that order',
        'fileFormatError': 'The file format is incorrect, please upload a file with an image type, such as JPG or PNG suffix.',
        'loginExpired': 'Your login status has expired, and you can stay on that page or log back in',
        'invalidSession': 'If the session is invalid, or the session has expired, please log in again.',
        'committing': 'The data is being processed, please do not submit it repeatedly',
        'networkError': 'The backend interface is abnormally connected',
        'timeout': 'The system interface request timed out',
        'downloading': 'Downloading data, please wait...',
        'downloadFailed': 'The download file failed, please contact the administrator!',
        'confirmLogout': 'Are you sure you want to logout?',
        'unsupportFullscreen': 'Your browser does not support full screen display',
        'saving': 'Saving to local, please wait...',
        'reseting': 'Clearing settings, please wait...',
    },
    'state': {
        '401': 'The authentication fails and the system resources cannot be accessed',
        '403': 'The current operation does not have permissions',
        '404': 'The access resource does not exist',
        'default': 'System Unknown Error'
    },
    'settings': {
        'title': {
            'system': 'System',
            'theme': 'Theme',
            'navbar': 'Navbar',
            'navToolbar': 'Toolbar',
            'tabs': 'Tabs',
            'sidebar': 'Sidebar',
        },
        'subTitle': {
            'mode': {
                'title': 'Mode',
                'options': {
                    'light': 'Light',
                    'dark': 'Dark',
                }
            },
            'layout': {
                'options': {
                    'vertical': 'Vertical',
                    'vertical-mix': 'Vertical Mix',
                    'horizontal': 'Horizontal',
                    'horizontal-mix': 'Horizontal Mix',
                }
            },
            'language': {
                'title': 'Language',
                'placeholder': 'Select Language',
                'options': {
                    'en': 'English',
                    'zh': '简体中文',
                }
            },
            'pageAnimateType': {
                'title': 'Page Animate Type',
                'options': {
                    'fade': 'Fade',
                    'fade-zoom': 'Fade Zoom',
                    'slide-right': 'Slide Right',
                    'slide-bottom': 'Slide Bottom',
                    'flip': 'Flip',
                    'none': 'None',
                }
            },
            'dynamicTitle': {
                'title': 'Dynamic Title'
            },
            'watermark': {
                'title': 'Watermark'
            },
            'grey': {
                'title': 'Grey'
            },
            'headerHeight': {
                'title': 'Header Height'
            },
            'fixedHeader': {
                'title': 'Fixed Header',
                'tip': 'When turned on, the navbar and tabs bar will be fixed to the top'
            },
            'showBreadcrumb': {
                'title': 'Show Breadcrumb'
            },
            'showBreadcrumbIcon': {
                'title': 'Show Breadcrumb Icon'
            },
            'tabsHeight': {
                'title': 'Tabs Height'
            },
            'tabsStyle': {
                'title': 'Tabs Style',
                'placeholder': '',
                'options': {
                    'card': 'Card',
                    'button': 'Button',
                    'line': 'Line',
                    'chrome': 'Chrome',
                    'trape': 'Trape'
                }
            },
            'showTabs': {
                'title': 'Show Tabs'
            },
            'showTabsIcon': {
                'title': 'Show Tabs Icon'
            },
            'draggable': {
                'title': 'Draggable'
            },
            'sidebarWidth': {
                'title': 'Sidebar Width'
            },
            'sidebarItemHeight': {
                'title': 'Sidebar Item Height'
            },
            'sidebarStyle': {
                'title': 'Sidebar Item Style',
                'placeholder': '',
                'options': {
                    'card': 'Card'
                }
            },
            'darkSidebar': {
                'title': 'Dark Sidebar',
                'tip': 'Takes effect only in daylight mode'
            },
            'uniqueOpened': {
                'title': 'Accordion',
                'tip': 'In accordion mode, only one submenu is allowed to expand'
            },
            'theme_primary': {
                'title': 'Primary Color'
            },
            'theme_success': {
                'title': 'Scuccess Color'
            },
            'theme_info': {
                'title': 'Info Color'
            },
            'theme_warning': {
                'title': 'Warning Color'
            },
            'theme_danger': {
                'title': 'Danger Color'
            },
            'navToolbar': {
                'options': {
                    'NavbarSearch': 'Search',
                    'Screenfull': 'Screenfull',
                    'DataScreen': 'Data Screen',
                    'LangSelect': 'Language Select',
                    'ModeSwitch': 'Mode Switch',
                }
            }
        }
    }
}