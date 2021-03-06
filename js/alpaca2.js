
var platform;
var repository;
var branch;
var node;
var repositoryId = 'f2c3571d7a2955e7f8a1';
var branchId = '7935c19b649b9c399528';
//var nodeId = '5b5019bc3683e8438699'; //counter node
var schemaSource;
var optionsSource;
var dataSource;
//var pageIdToLoad = "21f5c2a082ab59f6391b";
var pageIdToLoad;
var username;
var password;
var config;


var value;
var previewObject;

//var applicationId = 'c8a4dc1dd5644f2934be'; // to be provided for amex app
var applicationId = '6d5aa7e34b8be727b8d5'; // to be provided for amex app

//var emailProviderId = '2c4497662def5cde8e96';//from amex app
var emailProviderId = '6b1b6a8e002d85bb28bd';//from amex app

var workflowId = 'amexWorkflowShort';
//var workflowId = 'amexClone';

var projectId = '06fea8ff21b87b9e8358';
var draftNodeId;


//Switching from local developement to production will require switching config objects

function getPage(callback) {

    username = $("#txtUsername").val();
    password = $("#txtPassword").val();

    //config = {
    //               "username": username,
    //             "password": password,
    //              "baseURL": "/proxy"

    // }



    if (!($("#txtUsername").val()) || (!($("#txtPassword").val()))) {
       // $("#lblLoginLable").html("Username or password are incorrect. Please try again.");
       // return;
    }
    else {

        config = {
            "clientKey": "1bd1ddc4-37c7-4c80-b69b-b0d8d226cc34",
            "clientSecret": "CamxJ6k/aNYbuZVV1uTox0imFpsURRugGjt/AD77DGENmJ+U87Z1eh4KBdKtCcY8/Regd9DH8DYWGJ2mcdSCsK3a+aX1WR2ftnxQQ8yg6ck=",
            "username": username,
            "password": password,
            "baseURL": "https://api.cloudcms.com",
            "application": "c8a4dc1dd5644f2934be"
        }

        Gitana.connect(config, function (err) {

            if (err) {
                console.log("Error: " + err + window.location.href);
                $("#lblLoginLable").html("Username or password are incorrect. Please try again.");
                $("#dialog").css('display', 'block');

                return;

            } else {

                $("#dialog").css('display', 'none');
                $("#home").css('visibility', 'visible');
                $("#edit_nav").css('visibility', 'visible');

                checkCookie();
                //getPage(showAmexForm);
                $("#topics").attr('disabled', true);

            }
        }).then(function () {
            platform = this;

            // document.cookie = "username=" + username;
            //document.cookie = "password=" + password;

            this.readRepository(repositoryId).then(function () {
                repository = this;


                this.readBranch(branchId).then(function () {
                    branch = this;
                });
            });

        });
    }
}

var myData = {
    "a42ecce24ae285aea068": "Home Page",
    //"d9275c2e2cac27215841": "American Express",
    "35fdcd1a842f9bd38093": "Be Healthier",
    "24faf2f946aaaf4df61c": "Care for Family",
    "e598bce4cbbc130ca67c": "Chat Money Expert",
    "2f459081ab8e3cbe5e44": "Contact Us",
    //    "baee9580b9b08558d6a1": "Core Benefits",
    "2862657ea64547039eeb": "Core Benefits",
    "5e9bfb25da6e1274d3bf": "Education Benefits",
    "27936ab42ee296645389": "Family Expense",
    "4504e3b77aa2bbd9592f": "Get Help Health Care",
    "8399f467a5165c36718f": "Get Ready To Enroll",
    "c4428f3933404834e0db": "Get Specialized Health",
    "fc3b2067976ea86d472f": "Lower Expenses",
    //  "1ff9c71fef8aadd38466": "Pregnancy Adoption Benefits",
    "d231c85476b339833325": "Pregnancy Adoption Benefits",
    "cd9b943b651016db032e": "Protect Family Financially",
    "9706e1042e10ba5483df": "Save For The Future",
    "341faff00653a2a45b04": "See Doctor",
    "8fc2f47c2238f5614da0": "Special Support For Family",
    "fdc79e68d1f59a1c5c35": "Spend money",
    "dbc77b26b046e61114ed": "Global Content"
    //"bd12b9dd3b85c86c169b": "Get_Help_Health_Care2"

}

$("#myDropdown").alpaca({
    "options": {
        "label": "What page would you like to edit?",
        "type": "select",
        //"dataSource": { "5c5fb3b173fbb1185b4d": "medical.html" }
        "dataSource": myData
    }
});

$("#myDropdown").change(loadPage);

function loadPage() {
    pageIdToLoad = $("#alpaca1").val() || "a42ecce24ae285aea068";
    $("#topics").attr('disabled', true);

    $("#myform").css('visibility', 'hidden');
    $("#field1").empty();
    reShowForm();
}

var timer;
function setTimer() {
    timer = setTimeout(function () {
        location.reload();
    }, 900000);
}

function clearTimer() {
    clearTimeout(timer);
}

function reShowForm() {
    clearTimer();
    //console.log("Timer Cleared");
    setTimer();
    //console.log("Timer Set");
    platform = Gitana.connect(config).then(function () {
        platform = this;
        repository = platform.readRepository("f2c3571d7a2955e7f8a1").then(function () {
            branch = repository.readBranch("7935c19b649b9c399528").then(function () {
                node = branch.readNode(pageIdToLoad).then(function () {
                    //showAmexForm();                 
                    if (pageIdToLoad === 'a42ecce24ae285aea068') {
                        showHomePage();
                    } else if (pageIdToLoad === 'dbc77b26b046e61114ed') {
                        showFooter();
                    } else {
                        $('#topics').html("");
                        $("#topics").attr('disabled', true);
                        showDrop();
                    }
                });
            });
        });
    });
}
function showHomePage() {
    console.log("show homepage form");
    $("#field1").empty();
    $("#myform").css('visibility', 'hidden');
    $("#field1").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
            "title": "American Express HomePage",
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "title": "Page Name",
                    readonly: true
                },
                "heading": {
                    "type": "string",
                    "title": "Heading",
                    readonly: true
                },
                "title": {
                    "type": "string",
                    "title": "Page Title",
                    readonly: true
                },
                "prefix": {
                    "type": "string",
                    "title": "prefix",
                    readonly: true
                },
                "flag": {
                    "type": "string",
                    "title": "flag",
                    readonly: true
                },
                "body": {
                    "type": "string",
                    "title": "body",
                    readonly: true
                },
                "banner": {
                    "type": "array",
                    "title": "Banners",
                    "items": {
                        "properties": {
                            "imageBanner": {
                                "type": "string",
                                "title": "ImageBanner"
                            },
                            "imageP": {
                                "type": "string",
                                "title": "Heading Above"
                            },
                            "imageH": {
                                "type": "string",
                                "title": "Heading Styled"
                            },
                            "imageP2": {
                                "type": "string",
                                "title": "Heading Below"
                            },
                            "imageLink": {
                                "type": "string",
                                "title": "ImageLink"
                            }
                        },
                        "type": "object"
                    }
                },
                "forHealth": {
                    "type": "array",
                    "title": "Health Tile",
                    "items": {
                        "properties": {
                            "link": {
                                "type": "string",
                                "title": "Health Tile Link Url"
                            },
                            "description": {
                                "type": "string",
                                "title": "Health Tile Description"
                            }
                        },
                        "type": "object"
                    }
                },
                "forMoney": {
                    "type": "array",
                    "title": "Money Tile",
                    "items": {
                        "properties": {
                            "link": {
                                "type": "string",
                                "title": "Money Tile Link Url"
                            },
                            "description": {
                                "type": "string",
                                "title": "Money Tile Description"
                            }
                        },
                        "type": "object"
                    }
                },
                "forFamily": {
                    "type": "array",
                    "title": "Family Tile",
                    "items": {
                        "properties": {
                            "link": {
                                "type": "string",
                                "title": "Family Tile Link Url"
                            },
                            "description": {
                                "type": "string",
                                "title": "Family Tile Description"
                            }
                        },
                        "type": "object"
                    }
                }

            },
            "_parent": "n:node",
            "description": "custom:homepageame0",
            "$schema": "http://json-schema.org/draft-01/schema#",
            "items": {}
        },
        "options": {
            "form": {
                "buttons": {
                    "Preview": {
                        "click": function () {
                            clearTimer();
                            //console.log("Timer Cleared");
                            setTimer();
                            //console.log("Timer Set");
                            value = this.getValue();
                            var valueJson = JSON.stringify(value);
                            console.log(valueJson);
                            branch.createNode({
                                "name": value.name,
                                "heading": value.heading,
                                "title": value.title,
                                "prefix": value.prefix,
                                "flag": 'amexPage1Draft',
                                "body": value.body,
                                "banner": value.banner,
                                "forHealth": value.forHealth,
                                "forMoney": value.forMoney,
                                "forFamily": value.forFamily,
                                "_type": 'custom:homepageame0'
                            }).then(function () {
                                console.log("Showing preview of Homepage at QC site");
                                $('.alpaca-form-button-Approve').removeAttr("disabled");
                                draftNodeId = this._doc;
                                //window.open('http://qc.ah-prod.com/amex/' + value.name + '.html' + '?draft=' + this._doc, 'previewWindow');
                                window.open('http://qc.ahdemo.com/john/amex/' + value.name + '.html' + '?draft=' + this._doc, 'previewWindow');

                            });
                        }
                    },
                    "Approve": {
                        "attributes": {
                            "disabled": "disabled"
                        },
                        "click": function () {
                            clearTimer();
                            //console.log("Timer Cleared");
                            setTimer();
                            //console.log("Timer Set");

                            var value = this.getValue();
                            sendEmail(); //object must be created on cloudCMS before email can be sent
                            alert("Thank you for submitting an update. Please check your email for a verification link. Just click on the link to deploy your update!")
                        }
                    }
                }
            },
            "title": "newPageTitle",
            "engineId": "alpaca1",
            "fields": {
                "banner": {
                    "type": "array",
                    "items": {
                        "fields": {
                            "imageBanner": {
                                "type": "text"
                            },
                            "imageP": {
                                "type": "text",
                                "validator": function (callback) {
                                    var newValue = this.getValue();
                                    if (newValue.indexOf('<script>') != -1) {
                                        this.focus();
                                        this.setValue('');
                                        callback({
                                            "status": false
                                        });
                                        return;
                                    }
                                    callback({
                                        "status": true
                                    });
                                },
                            },
                            "imageH": {
                                "type": "text",
                                "validator": function (callback) {
                                    var newValue = this.getValue();
                                    if (newValue.indexOf('<script>') != -1) {
                                        this.focus();
                                        this.setValue('');
                                        callback({
                                            "status": false
                                        });
                                        return;
                                    }
                                    callback({
                                        "status": true
                                    });
                                },
                            },
                            "imageP2": {
                                "type": "text",
                                "validator": function (callback) {
                                    var newValue = this.getValue();
                                    if (newValue.indexOf('<script>') != -1) {
                                        this.focus();
                                        this.setValue('');
                                        callback({
                                            "status": false
                                        });
                                        return;
                                    }
                                    callback({
                                        "status": true
                                    });
                                }
                            },
                            "imageLink": {
                                "type": "text"
                            }
                        }
                    },
                    "toolbarSticky": true,
                    "actionbar": {
                        "actions": [
                            {
                                "action": "add",
                                "enabled": false
                            },
                            {
                                "action": "remove",
                                "enabled": false
                            }]
                    }
                },
                "forHealth": {
                    "type": "array",
                    "items": {
                        "fields": {
                            "link": {
                                "type": "text",
                                "validator": function (callback) {
                                    var newValue = this.getValue();
                                    if (newValue.indexOf('<script>') != -1) {
                                        this.focus();
                                        this.setValue('');
                                        callback({
                                            "status": false
                                        });
                                        return;
                                    }
                                    callback({
                                        "status": true
                                    });
                                },
                            },
                            "description": {
                                "type": "text",
                                "validator": function (callback) {
                                    var newValue = this.getValue();
                                    if (newValue.indexOf('<script>') != -1) {
                                        this.focus();
                                        this.setValue('');
                                        callback({
                                            "status": false
                                        });
                                        return;
                                    }
                                    callback({
                                        "status": true
                                    });
                                }
                            }
                        }
                    },
                    "toolbarSticky": true,
                    "actionbar": {
                        "actions": [
                            {
                                "action": "add",
                                "enabled": false
                            },
                            {
                                "action": "remove",
                                "enabled": false
                            }]
                    }
                },
                "forMoney": {
                    "type": "array",
                    "items": {
                        "fields": {
                            "link": {
                                "type": "text",
                                "validator": function (callback) {
                                    var newValue = this.getValue();
                                    if (newValue.indexOf('<script>') != -1) {
                                        this.focus();
                                        this.setValue('');
                                        callback({
                                            "status": false
                                        });
                                        return;
                                    }
                                    callback({
                                        "status": true
                                    });
                                },
                            },
                            "description": {
                                "type": "text",
                                "validator": function (callback) {
                                    var newValue = this.getValue();
                                    if (newValue.indexOf('<script>') != -1) {
                                        this.focus();
                                        this.setValue('');
                                        callback({
                                            "status": false
                                        });
                                        return;
                                    }
                                    callback({
                                        "status": true
                                    });
                                }
                            }
                        }
                    },
                    "toolbarSticky": true,
                    "actionbar": {
                        "actions": [
                            {
                                "action": "add",
                                "enabled": false
                            },
                            {
                                "action": "remove",
                                "enabled": false
                            }]
                    }
                },
                "forFamily": {
                    "type": "array",
                    "items": {
                        "fields": {
                            "link": {
                                "type": "text",
                                "validator": function (callback) {
                                    var newValue = this.getValue();
                                    if (newValue.indexOf('<script>') != -1) {
                                        this.focus();
                                        this.setValue('');
                                        callback({
                                            "status": false
                                        });
                                        return;
                                    }
                                    callback({
                                        "status": true
                                    });
                                },
                            },
                            "description": {
                                "type": "text",
                                "validator": function (callback) {
                                    var newValue = this.getValue();
                                    if (newValue.indexOf('<script>') != -1) {
                                        this.focus();
                                        this.setValue('');
                                        callback({
                                            "status": false
                                        });
                                        return;
                                    }
                                    callback({
                                        "status": true
                                    });
                                }
                            }
                        }
                    },
                    "toolbarSticky": true,
                    "actionbar": {
                        "actions": [
                            {
                                "action": "add",
                                "enabled": false
                            },
                            {
                                "action": "remove",
                                "enabled": false
                            }]
                    }
                }
            }
        }
    });

    $('.alpaca-form-button-Preview').append('Preview');
    $('.alpaca-form-button-Approve').append('Approve');
}
function showFooter() {
    console.log("show Footer form");
    $("#field1").empty();
    $("#myform").css('visibility', 'hidden');
    $("#field1").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
            "title": "American Express Global Content",
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "title": "name",
                    readonly: true
                },
                "heading": {
                    "type": "string",
                    "title": "heading",
                    readonly: true
                },
                "title": {
                    "type": "string",
                    "title": "title",
                    readonly: true
                },
                "prefix": {
                    "type": "string",
                    "title": "prefix",
                    readonly: true
                },
                "flag": {
                    "type": "string",
                    "title": "flag",
                    readonly: true
                },
                "body": {
                    "type": "string",
                    "title": "body",
                    readonly: true
                },
                "footer": {
                    "type": "array",
                    "title": "",
                    "toolbarsticky": false,
                    "items": {
                        "properties": {
                            "trend": {
                                "items": {
                                    "type": "string",
                                    "title": "What's Trending"
                                },
                                "type": "array",
                                "title": ""
                            },
                            "items": {
                                "type": "array",
                                "title": "Stay in Know",
                                "items": {
                                    "type": "object",
                                    "title": "",
                                    "properties": {
                                        "desc": {
                                            "type": "string",
                                            "title": "Stay in know Description"
                                        },
                                        "link": {
                                            "type": "string",
                                            "title": "Stay in know Url"
                                        }
                                    }
                                }
                            }
                        },
                        "type": "object"
                    }
                }
            },
            "_parent": "n:node",
            "description": "custom:footerpag0",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "items": {}
        },
        "options": {
            "form": {
                "buttons": {
                    "Preview": {
                        "click": function () {
                            clearTimer();
                            //console.log("Timer Cleared");
                            setTimer();
                            //console.log("Timer Set");

                            value = this.getValue();

                            var valueJson = JSON.stringify(value);
                            console.log(valueJson);


                            branch.createNode({
                                "name": value.name,
                                "heading": value.heading,
                                "title": value.title,
                                "prefix": value.prefix,
                                "flag": 'amexPage1Draft',
                                "body": value.body,
                                "footer": value.footer,
                                "_type": 'custom:footerpag0'
                            }).then(function () {
                                console.log("Showing preview of Footer at QC site");
                                $('.alpaca-form-button-Approve').removeAttr("disabled");
                                draftNodeId = this._doc;
                                //window.open('http://qc.ah-prod.com/amex/' + 'index' + '.html' + '?draftFooter=' + this._doc, 'previewWindow');
                                window.open('http://qc.ahdemo.com/john/amex/' + 'index' + '.html' + '?draftFooter=' + this._doc, 'previewWindow');

                            });
                        }
                    },
                    "Approve": {
                        "attributes": {
                            "disabled": "disabled"
                        },
                        "click": function () {
                            clearTimer();
                            //console.log("Timer Cleared");
                            setTimer();
                            //console.log("Timer Set");

                            var value = this.getValue();
                            sendEmail(); //object must be created on cloudCMS before email can be sent
                            alert("Thank you for submitting an update. Please check your email for a verification link. Just click on the link to deploy your update!")
                        }
                    }
                }
            },
            "title": "newPageTitle",
            "engineId": "alpaca1",
            "fields": {
                "footer": {
                    "type": "array",
                    "toolbarSticky": false,
                    "items": {
                        "fields": {
                            "trend": {
                                "items": {
                                    "type": "ckeditor",
                                    "toolbarSticky": false,
                                    "ckeditor": {
                                        "toolbar": [
                                            ['Bold', 'Italic', 'Underline', 'Cut', 'Copy', 'Paste'], ['NumberedList', 'BulletedList', 'Link', 'Unlink'], ['Table', 'Source']
                                        ]
                                    }
                                },
                                "actionbar": {
                                    "actions": [{
                                        "action": "add",
                                        "enabled": false
                                    },
                                    {
                                        "action": "remove",
                                        "enabled": false
                                    },
                                    {
                                        "action": "up",
                                        "enabled": false
                                    },
                                    {
                                        "action": "down",
                                        "enabled": false
                                    }
                                    ]
                                }
                            },
                            "items": {

                                "actionbar": {
                                    "actions": [{
                                        "action": "add",
                                        "enabled": false
                                    },
                                    {
                                        "action": "remove",
                                        "enabled": false
                                    },
                                    {
                                        "action": "up",
                                        "enabled": true
                                    },
                                    {
                                        "action": "down",
                                        "enabled": true
                                    }
                                    ]
                                }
                            }
                        }
                    }
                }


            }
        }
    });

    $('.alpaca-form-button-Preview').append('Preview');
    $('.alpaca-form-button-Approve').append('Approve');
}

function showDrop() {
    var topicArray = new Array();
    $("#topics").append("<option value='none" + i + "'> None </option>");
    for (var i = 0; i < node.topics.length; i++) {
        topicArray[i] = node.topics[i].topicHeader;
        if (topicArray[i] === undefined) {
            $("#topics").append("<option value='default'>Default</option>");
        }
        else {
            $("#topics").append("<option value='topics_" + i + "'>" + node.topics[i].topicHeader + " </option>");
        }
    }
    $("#topics").attr('disabled', false);
    showForm(i);

}

function showTopic(topic) {
    var topic_id = topic.options[topic.selectedIndex].getAttribute('value');
    //close any open topics
    for (var t = 0; t < topic.options.length ; t++) {
        var field = $('.alpaca-field.alpaca-field-object.alpaca-optional.alpaca-field-valid').find("[data-alpaca-field-name='topics_" + t + "']");
        if (field.css('display') == 'block') {
            field.css('display', 'none');
        }
        else {
            // console.log('off');
        }
    }
    //check if default (ie get ready enroll page )then show everything
    if (topic_id === 'default') {
        var f = $('.alpaca-field.alpaca-field-object.alpaca-optional.alpaca-field-valid').find("[data-alpaca-field-name='topics_0']");
        f.css('display', 'block');
        f.css('border', '4px solid #F0A59C');
        f.css('border-radius', '10px');
        $('.alpaca-form-buttons-container').css('display', 'block');
        //set topic title as readonly
        var elem = $('input[name="topics_0_topicTitle1"]');
        elem.attr('disabled', true);
    } else {
        var f = $('.alpaca-field.alpaca-field-object.alpaca-optional.alpaca-field-valid').find("[data-alpaca-field-name='" + topic_id + "']");
        f.css('display', 'block');
        f.css('border', '4px solid #F0A59C');
        f.css('border-radius', '10px');
        $('.alpaca-form-buttons-container').css('display', 'block');
    }
}
function showForm(count) {
    //console.log("showForm");
    $("#field1").empty();
    $("#field1").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
            "title": "",
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "title": "Page Name",
                    readonly: true
                },
                "heading": {
                    "type": "string",
                    "title": "Heading",
                    readonly: true
                },
                "title": {
                    "type": "string",
                    "title": "Page Title",
                    readonly: true
                },
                "prefix": {
                    "type": "string",
                    "title": "prefix",
                    readonly: true
                },
                "flag": {
                    "type": "string",
                    "title": "flag",
                    readonly: true
                },
                "body": {
                    "type": "string",
                    "title": "body",
                    readonly: true
                },
                "topics": {
                    "type": "array",
                    "title": "",
                    "items": {
                        "properties": {
                            "topicHeader": {
                                "type": "string",
                                "title": "Topic Header",
                                "readonly": true
                            },
                            "topicTitle1": {
                                "type": "string",
                                "title": "TopicTitle"
                            },
                            "items": {
                                "type": "array",
                                "title": "Callout Items",
                                "items": {
                                    "type": "object",
                                    "title": "Item",
                                    "properties": {
                                        "link": {
                                            "type": "string",
                                            "title": "Link Url"
                                        },
                                        "sblob": {
                                            "type": "string",
                                            "title": "Description"
                                        }
                                    }
                                }
                            },
                            "rich_blobs": {
                                "items": {
                                    "type": "string",
                                    "title": "Items"
                                },
                                "type": "array",
                                "title": "Editable Callouts"
                            }
                        },
                        "type": "object"
                    }
                }
            },
            "_parent": "n:node",
            "description": "custom:testame0",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "items": {}
        },
        "options": {
            "form": {
                "buttons": {
                    "Preview": {
                        "click": function () {
                            clearTimer();
                            //console.log("Timer Cleared");
                            setTimer();
                            //console.log("Timer Set");

                            value = this.getValue();

                            var valueJson = JSON.stringify(value);
                            console.log(valueJson);


                            branch.createNode({
                                "name": value.name,
                                "heading": value.heading,
                                "title": value.title,
                                "prefix": value.prefix,
                                "flag": 'amexPage1Draft',
                                "body": value.body,
                                "topics": value.topics,
                                "_type": 'custom:testame0'
                            }).then(function () {
                                console.log("Showing preview of standard page at QC site");
                                $('.alpaca-form-button-Approve').removeAttr("disabled");
                                draftNodeId = this._doc;
                                //window.open('http://qc.ah-prod.com/amex/' + value.name + '.html' + '?draft=' + this._doc, 'previewWindow');
                                window.open('http://qc.ahdemo.com/john/amex/' + value.name + '.html' + '?draft=' + this._doc, 'previewWindow');

                            });
                        }
                    },
                    "Approve": {
                        "attributes": {
                            "disabled": "disabled"
                        },
                        "click": function () {
                            clearTimer();
                            //console.log("Timer Cleared");
                            setTimer();
                            //console.log("Timer Set");

                            var value = this.getValue();
                            sendEmail(); //object must be created on cloudCMS before email can be sent
                            alert("Thank you for submitting an update. Please check your email for a verification link. Just click on the link to deploy your update!")
                        }
                    }
                }
            },
            "title": "newPageTitle",
            "engineId": "alpaca1",
            "fields": {
                "topics": {
                    "type": "array",
                    "toolbarSticky": false,
                    "items": {
                        "fields": {
                            "topicHeader": {
                                "type": "text",
                                "order": 1
                            },
                            "topicTitle1": {
                                "type": "text",
                                "validator": function (callback) {
                                    var newValue = this.getValue();
                                    if (newValue.indexOf('<script>') != -1) {
                                        this.focus();
                                        this.setValue('');
                                        callback({
                                            "status": false
                                        });
                                        return;
                                    }
                                    callback({
                                        "status": true
                                    });
                                },
                                "onFieldChange": function (e) {
                                    var value = this.getValue();
                                }, "order": 2
                            },
                            "items": {
                                "type": "array",
                                "toolbarSticky": false,
                                "items": {
                                    "fields": {
                                        "link": {
                                            "type": "text",
                                            "validator": function (callback) {
                                                var value = this.getValue();
                                                if (value.indexOf('<script>') != -1) {
                                                    this.focus();
                                                    this.setValue('');
                                                    callback({
                                                        "status": false
                                                    });
                                                    return;
                                                }
                                                callback({
                                                    "status": true
                                                });
                                            },
                                            "order": 2
                                        },
                                        "sblob": {
                                            "type": "text",
                                            "validator": function (callback) {
                                                var value = this.getValue();
                                                if (value.indexOf('<script>') != -1) {
                                                    this.focus();
                                                    this.setValue('');
                                                    callback({
                                                        "status": false
                                                    });
                                                    return;
                                                }
                                                callback({
                                                    "status": true
                                                });
                                            },
                                            "order": 1
                                        }
                                    }
                                },
                                "order": 4
                            },
                            "rich_blobs": {
                                "items": {
                                    "type": "ckeditor",
                                    "ckeditor": {
                                        "toolbar": [
                                            ['Bold', 'Italic', 'Underline', 'Cut', 'Copy', 'Paste'], ['NumberedList', 'BulletedList', 'Link', 'Unlink'], ['Table', 'Source']
                                        ]
                                    }
                                },
                                "actionbar": {
                                    "actions": [{
                                        "action": "add",
                                        "enabled": false
                                    },
                                    {
                                        "action": "remove",
                                        "enabled": false
                                    },
                                    {
                                        "action": "up",
                                        "enabled": false
                                    },
                                    {
                                        "action": "down",
                                        "enabled": false
                                    }
                                    ]
                                }
                                ,
                                "order": 3
                            }
                        }
                    }
                }
            }
        },
        "postRender": function (control) {
            var a = control.childrenByPropertyId["topics"];
            //a.getFieldEl().css('display', 'none');
            var n = control.childrenByPropertyId["topics"].children;
            for (var i = 0; i < n.length ; i++) {
                n[i].getFieldEl().css('display', 'none');
                //hide empty items  
                for (var j = 0; j < n[i].children[3].children.length ; j++) {
                    var $this = n[i].children[3].children[j];
                    if ($this.childrenByPropertyId["sblob"].data == null && $this.childrenByPropertyId["link"].data == null) {
                        // console.log('both empty' + j);
                        n[i].children[3].children[j].getFieldEl().css('display', 'none');
                    } else {
                        // console.log($this.childrenByPropertyId["sblob"].data);
                    }
                }
            }
        }
    });

    myVar = setTimeout(function () {
        $("#myform").css('visibility', 'visible');
    }, 3000);

    //$("#field1").css("visibility", "hidden");
    $('.alpaca-form-button-Preview').append('Preview');
    $('.alpaca-form-button-Approve').append('Approve');
}

function sendEmail() {
    console.log("sending email with draft node Id of " + draftNodeId);
    console.log("node: ", node);
    node.subchain(platform).then(function () {
        // NOTE: this = platform
        var workflowConfig = {};
        workflowConfig.context = {};
        workflowConfig.context.projectId = projectId;
        workflowConfig.payloadType = "content";
        workflowConfig.payloadData = {
            "repositoryId": repositoryId,
            "branchId": branchId
        };
        workflowConfig.runtime = {};
        workflowConfig.runtime.applicationId = applicationId;
        workflowConfig.runtime.emailProviderId = emailProviderId;
        workflowConfig.runtime.repositoryId = repositoryId;
        workflowConfig.runtime.branchId = branchId;

        console.log("workflowconfig: ", workflowConfig);
        // auth info
        var authInfo = platform.getDriver().authInfo;
        console.log("authInfo: ", authInfo);
        // find the current user

        console.log("this: ", this);
        this.readDomain(authInfo.principalDomainId).readPrincipal(authInfo.principalId).then(function () {
            var currentUser = this;

            console.log("currentUser: ", currentUser);
            // create workflow and include the current user's email

            console.log("platform: ", platform);
            console.log("workflowId: ", workflowId);
            this.subchain(platform).createWorkflow(workflowId, workflowConfig).then(function () {
                console.log("Adding resource node as above: ", node );
                this.addResource(node);
                var data = {
                    "coreNodeId": node._doc,
                    "draftNodeId": draftNodeId,
                    "email": currentUser.email
                }
                console.log("starting email workflow with this data: ", data);
                this.start(data).then(function () {
                });
            });
        });
    });
}



function checkCookie() {
    if (performance.navigation.type == 1) {
        //console.log('page reloaded');
        Gitana.deleteCookie("password", "/ah-prod.com-amex-admin");
        Gitana.deleteCookie("username", "/ah-prod.com-amex-admin");
        Gitana.deleteCookie("password", "/localhost");
        Gitana.deleteCookie("username", "/localhost");
        Gitana.deleteCookie("password", "/");
        Gitana.deleteCookie("username", "/");
    }
    //console.log('checking cookies');
    var user = getCookie("username");
    var pswd = getCookie("password");
    if (user != "" && pswd != "") {
        console.log("Welcome again " + user);
        username = user;
        password = pswd;
        $("#dialog").dialog("close");
        loadPage();
    } else {
        //   $("#loginContainer").append('<div id="dialog" title="Please Log In."><label>Username:</label><input id="txtUsername" name="txtUsername" type="text"><label>Password:</label><input id="txtPassword" name="txtPassword" type="password"><br/><input id="submitButton" onclick="setCredentialsFromLogin()" name="Submit" type="button" value="Submit"><label id="lblLoginLable"></label></div>');

        /*$("#dialog").dialog({
            modal: true,+
            draggable: false,
            width: "auto",
            position: {
                my: "top",
                at: "center",
                of: window
            },
            create: function (event, ui) {
                $(this).css("maxWidth", "300px");
            }

        });
        $("#dialog").css('display', 'block');

        $(".selector").dialog("open");*/
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function setCredentialsFromLogin() {
    /*
        username = $("#txtUsername").val();
        password = $("#txtPassword").val();
        console.log('back');
        if (username == '' || password == '') {
            alert('Please enter valid username/password');
        } else {
            $("#dialog").css('display', 'none');
            $("#home").css('visibility', 'visible');
            $("#edit_nav").css('visibility', 'visible');
    
            checkCookie();
            //getPage(showAmexForm);
            $("#topics").attr('disabled', true);
            getPage(showDrop);
        }
        */
}

function logout() {
    Gitana.deleteCookie("password", "/ah-prod.com-amex-admin");
    Gitana.deleteCookie("username", "/ah-prod.com-amex-admin");
    Gitana.deleteCookie("password", "/localhost");
    Gitana.deleteCookie("username", "/localhost");
    Gitana.deleteCookie("password", "/");
    Gitana.deleteCookie("username", "/");
    platform.logout();
    open("alpaca2.html", "_self");
}

var fl = document.getElementById('myFileUpload5');
fl.onchange = function (e) {
    var ext = this.value.match(/\.(.+)$/)[1];
    switch (ext) {
        case 'pdf':
            console.log('pdf file type allowed');
            break;
        case 'png':
            console.log('png file type allowed');
            break;
        case 'PNG':
            console.log('png file type allowed');
            break;
        case 'JPG':
            console.log('jpg file type allowed');
            break;
        case 'jpg':
            console.log('jpg file type allowed');
            break;
        case 'jpeg':
            console.log('jpeg file type allowed');
            break;
        case 'JPEG':
            console.log('jpeg file type allowed');
            break;
        case 'xls':
            console.log('Excel file type allowed');
            break;
        case 'xlsx':
            console.log('Excel file type allowed');
            break;
        default:
            alert('Pdf , png ,jpg files may be uploaded');
            this.value = '';
    }
    //check for malicious file upload
    readBlob();
};

function readBlob(opt_startByte, opt_stopByte) {
    var files = document.getElementById('myFileUpload5').files;
    if (!files.length) {
        alert('Please select a file!');
        return;
    }
    var file = files[0];
    var start = parseInt(opt_startByte) || 0;
    var stop = parseInt(opt_stopByte) || file.size - 1;
    var reader = new FileReader();
    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function (evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2         
            if ((evt.target.result.indexOf('cannot be run in DOS mode') > 0) || (evt.target.result.indexOf('This program must be run under Win32') > 0) || (evt.target.result.indexOf('win32') > 0) || (evt.target.result.indexOf('Win32') > 0)) {
                alert('Invalid file upload. Please check uploaded file type (Pdf , png ,jpg files may be uploaded)');
                $('#myFileUpload5').val('');
                return;
            }
            else {
                alert('Valid file upload.')
            }
        }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsText(blob);

}

$("#uploadFilenameEdit5").on('change keyup paste mouseup', function () {
    $("#myFileName1").html($("#uploadFilenameEdit5").val());
    var tx = "https://3e87873b-2f33-4a70-8478-8a480f81553e-hosted.cloudcms.net/static/test.pdf?repository=f2c3571d7a2955e7f8a1&branch=7935c19b649b9c399528&node=fd1f6aafd2b6e54d0c71&attachment=";
    $("#lnk1").html(tx + ($("#uploadFilenameEdit5").val()).replace(" ", "_"));
});

//This is form upload scripting here--------------------------------------------
var ContainerId = 'fd1f6aafd2b6e54d0c71';
function submitForm() {
    readBlob();
    if ($('#myFileUpload5').val() !== "") {
        var formData = new FormData($("#frmeditSubmitForm5")[0]);
        console.log(formData + '***');
        alert("Please wait while your resource being uploaded.");
        Gitana.connect(config, function (err) {
            var authorizationHeader = this.platform().getDriver().getHttpHeaders()["Authorization"];
            var form = $("#frmeditSubmitForm5");
            $.ajax({
                type: "POST",
                url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + ContainerId + "/attachments/" + ($("#uploadFilenameEdit5").val()).replace(" ", "_") + "/",
                data: formData,
                contentType: false,
                processData: false,
                headers: {
                    authorization: authorizationHeader
                },
                success: function (response) {
                    alert("Resource Uploaded Successfully.");
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown + " : Please contact the server administrator.");
                }
            });
        });
    }
}

//This ends form upload scripting-----------------------------------------------


function copyToClipboard(element) {
    var lnk = $("#uploadFilenameEdit5").val();
    if (lnk) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
    }
}
