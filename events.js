PAGES = []
getLoggedUserAPI()
// checkAccess()
renderPages()
// var page = getPage()
// getEmployees()
hideMenuOptions()
bringTitles()
bringDepartament()
bringCoaches()
bringManagers()
bringWorkLocations()
var page = null
if (page == 'personal-goals') {
    usersFromSpreadsheet()
    getGoals()
    personalGoals()
    loader()
} else if (page == 'team-goals') {
    //  usersFromSpreadsheet()
    loader(true)
    goalsComments()
    getGoals()
    teamGoals()
    loader()
} else if (page == 'etro-team') {
    bringUsersOnHomeFromSpreadsheet()
    loader()
} else if (page == 'new-goal') {
    //  usersFromSpreadsheet()
    bringPdfPeopleBuilder()
    renderPages('pdf_people_builder_page')
    loader()
} else {
    // renderPages('home')
    // bringUsersOnHomeFromSpreadsheet()
    loader()
}

//  usersFromSpreadsheet()
goalsComments()
listeners()
start()
scrolling()
loader()


// function checkAccess() {
//     var access = $('.settings').find('#access').text()
//     window.hasAccess = access
//     console.log('Access Type: ', access)
// }

// function getPage() {
//     var page = $('.settings').find('#page').text()
//     console.log('Page: ', page)
//     return page
// }

// function getEmployees() {
//     var employees = $('.settings').find('#employees').text()
//     var employeesObj = JSON.parse(employees)
//     window.usersSpreadsheetCache = employeesObj
//     console.log('employees: ', employeesObj)
//     return employeesObj
// }

function scrolling() {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= 1) {
            $('.nav-bar').addClass('nav-fixed')
            $('.table-users').addClass('header-table-fixed')
        } else {
            $('.nav-bar').removeClass('nav-fixed')
            $('.table-users').removeClass('header-table-fixed')
        }
    })
}

function start() {
    
    $('.collapsible').collapsible()
    $('#search-type').focus()
    $('.modal').modal()
    $('.tabs').tabs()
    $('select').formSelect()
    $(".dropdown-trigger").dropdown()
    $(".filter_user_list").dropdown({
        closeOnClick: false,
        coverTrigger: false
    })
    $("#select-quotas").formSelect()
    $('.target_date').datepicker({
        format: 'mmmm dd, yyyy',
        autoClose: true,
        firstDay: 1,
        defaultDate: new Date().toISOString().split('T')[0],
        setDefaultDate: true,
        onSelect: function (date) {
            $('.target_date').attr('data-date', date.toISOString().split('T')[0])
        },
        setDate: new Date()
    })
    $('.tooltipped').tooltip()
    $('#profile-manager').formSelect()
    $('#profile-title').formSelect()
    $('#profile-coach').formSelect()
    $(".tolltipGoalTerm").tooltip({
        tooltipClass: "custom-tooltip-styling"
    })
    $('.sidenav').sidenav()
    $('.monthly-checkin-date').datepicker({
        format: 'mmmm dd, yyyy',
        autoClose: true,
        firstDay: 1
    })
    $('#start_date').datepicker({
        format: 'mmmm dd, yyyy',
        autoClose: true,
        firstDay: 1
    })
    $('#end_date').datepicker({
        format: 'mmmm dd, yyyy',
        autoClose: true,
        firstDay: 1
    })
    $('#meeting_date').datepicker({
        format: 'mmmm dd, yyyy',
        autoClose: true,
        firstDay: 1,
        onSelect: function (date) {
            $('#meeting_date').attr('data-meeting-date', date.toISOString().split('T')[0])
        }
    })

    // new Quill('#editor_annoucement_email', {
    //     theme: 'snow' // ou 'bubble'
    // });

    // new Quill('#editor_annoucement_slack', {
    //     theme: 'snow' // ou 'bubble'
    // });


}

function updateAfterFillBreadcrumbs() {
    $('.breadcrumb').on('click', function () {
        renderPages()
        if (PAGES.length = 1) {
            $('.pages-breadcrumbs').empty()

        }
    })
}

function renderPages(page) {
    var response = { status: 1, message: 'Done' }
    $('.pages-breadcrumbs').empty()

    if (page != 'users-list' && page != undefined) {

        if (!window.hasAccess) {
            // customMessage('You can not access this page')
            return
        }
    }

    $('.pages').hide()

    if (!PAGES.includes('home')) {
        PAGES.push('home')
    }

    if (page && !PAGES.includes(page)) {
        PAGES.push(page)
    } else if (page && PAGES.includes(page)) {
        var index = PAGES.indexOf(page)
        PAGES.splice(index, 1)
        PAGES.push(page)
    } else if (!page && PAGES.length >= 1) {
        PAGES.pop()
    }

    // toggleSearch()

    for (let item in PAGES) {
        $('.pages-breadcrumbs').append(`<a  class="breadcrumb">${PAGES[item]}</a>`)
    }

    var currentPage = PAGES[PAGES.length - 1]
    $(`.${currentPage}`).show()

    // if ($('.users-list').is(':visible')) {
    //     $('.search-type-li').show()
    // } else {
    //     $('.search-type-li').hide()
    // }

    updateAfterFillBreadcrumbs()
    return response

}

function bringWorkLocations() {

    /*/*google.script.run.withSuccessHandler(function (result) {

        for (let index = 0; index < result.length; index++) {
            const element = result[index]
            $('#work-address').append(`    
                <option value="${element[0]}">${element[1]}</option>
            `)
        }

        $('select').formSelect()

    }).withFailureHandler(function (e) {

        customMessage(e)

    }).bringLocations()*/

}

function fillTableUsers(users) {
    $('.tbody-users').children().remove()
    users.forEach((element, index) => {
        var fullName = element[3]
        var id = element[0]
        var photo = element[24] || 'https://www.gstatic.com/images/branding/product/2x/avatar_square_grey_48dp.png'
        var email = element[4]
        var manager = element[26] ? element[26] : ""
        var title = element[11]
        var coach = element[20]
        var coach = coach.replace('Coach: ', "")
        var department = element[25]
        var admin = element[5] ? element[5] : element[6]
        var address = element[18].replace(/-/g, ' ')
        var addressId = element[18]
        var phone = element[13]
        var phoneType = element[12]
        var suspended = element[9]

        $('.tbody-users').append(`
            <tr ${suspended ? "style='background-color: #A6A8AB; color: white;'" : ""}>
                <td class="td_image_fullname" style="
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                    ">
                    <img class="responsive-img circle" src="${photo}" style="max-width: 18%; margin-right: 20px;" />
                    ${fullName}
                    ${admin ? '<img src="https://iili.io/Jazab4a.png" class="icon-admin" />' : ''}
                </td>
                <td class="td_email" data-id="${id}">${email}</td>
                <td class="td_title" >${title}</td>
                <td class="td_department" >${department}</td>
                <td class="td_manager" >${manager}</td>
                <td class="td_coach" >${coach}</td>
                <td class="td_address" data-id="${addressId}">${address}</td>
                <td class="td_phone" phone-type="${phoneType}" >${phone}</td>
            </tr>
        `)

    })

}

function listeners() {

    $('.btn-cancel-user').on('click', function () {
        renderPages('users-list')

    })

    $('.table-users thead tr th').on('click', function () {
        var filterBy = $(this).attr('value')
        var users = []
        switch (filterBy) {
            case 'buildingId':
                var users = sortByBuildingId()
                break
            case 'fullName':
                var users = sortByfullName()
                break
            case 'title':
                var users = sortBytitle()
                break
            case 'coach':
                var users = sortByCoach()
                break
            case 'department':
                var users = sortBydepartment()
                break
            default:
                break;
        }

        var icon = changeIconHeaders(filterBy)
        $(`[value=${filterBy}]`).find('i').text(icon)

        users.length ? fillTableUsers(users) : ""

    })

    $('.btn_refresh_google').on('click', function () {
        console.log('fui clicado')
    })

    function changeIconHeaders(attr) {
        var icon = $(`[value=${attr}]`).find('i').text()
        if (icon.includes('down')) {
            icon = 'arrow_drop_up'
        } else {
            icon = 'arrow_drop_down'
        }

        return icon

    }

    var isSorted = true

    function sortByBuildingId() {
        var users = window.usersFromGoogleCache

        if (isSorted) {
            users.sort(function (a, b) {
                var first = b.hasOwnProperty('locations') && b.locations[0]?.hasOwnProperty('buildingId') ? b.locations[0].buildingId : "z"
                var second = a.hasOwnProperty('locations') && a.locations[0]?.hasOwnProperty('buildingId') ? a.locations[0].buildingId : "z"

                return second.localeCompare(first)
            })

        } else {
            users.sort(function (a, b) {
                var first = a.hasOwnProperty('locations') && a.locations[0]?.hasOwnProperty('buildingId') ? a.locations[0].buildingId : "z"
                var second = b.hasOwnProperty('locations') && b.locations[0]?.hasOwnProperty('buildingId') ? b.locations[0].buildingId : "z"

                return second.localeCompare(first)
            })
        }

        isSorted = !isSorted

        return users
    }

    function sortByfullName() {
        var users = window.usersFromGoogleCache

        if (isSorted) {
            users.sort(function (a, b) {
                var first = b.hasOwnProperty('name') && b.name?.hasOwnProperty('fullName') ? b.name.fullName : "z"
                var second = a.hasOwnProperty('name') && a.name?.hasOwnProperty('fullName') ? a.name.fullName : "z"

                return second.localeCompare(first)
            })

        } else {
            users.sort(function (b, a) {
                var first = b.hasOwnProperty('name') && b.name?.hasOwnProperty('fullName') ? b.name.fullName : "z"
                var second = a.hasOwnProperty('name') && a.name?.hasOwnProperty('fullName') ? a.name.fullName : "z"

                return second.localeCompare(first)
            })
        }

        isSorted = !isSorted

        return users
    }

    function sortBytitle() {
        var users = window.usersFromGoogleCache
        if (isSorted) {
            users.sort(function (a, b) {
                var first = b.hasOwnProperty('organizations') && b.organizations[0]?.hasOwnProperty('title') ? b.organizations[0].title : "z"
                var second = a.hasOwnProperty('organizations') && a.organizations[0]?.hasOwnProperty('title') ? a.organizations[0].title : "z"

                return second.localeCompare(first)
            })

        } else {
            users.sort(function (b, a) {
                var first = b.hasOwnProperty('organizations') && b.organizations[0]?.hasOwnProperty('title') ? b.organizations[0].title : "z"
                var second = a.hasOwnProperty('organizations') && a.organizations[0]?.hasOwnProperty('title') ? a.organizations[0].title : "z"

                return second.localeCompare(first)
            })
        }

        isSorted = !isSorted

        return users
    }

    function sortBydepartment() {
        var users = window.usersFromGoogleCache

        if (isSorted) {
            users.sort(function (a, b) {
                var first = b.hasOwnProperty('organizations') && b.organizations[0]?.hasOwnProperty('department') ? b.organizations[0].department : "z"
                var second = a.hasOwnProperty('organizations') && a.organizations[0]?.hasOwnProperty('department') ? a.organizations[0].department : "z"

                return second.localeCompare(first)
            })

        } else {
            users.sort(function (b, a) {
                var first = b.hasOwnProperty('organizations') && b.organizations[0]?.hasOwnProperty('department') ? b.organizations[0].department : "z"
                var second = a.hasOwnProperty('organizations') && a.organizations[0]?.hasOwnProperty('department') ? a.organizations[0].department : "z"

                return second.localeCompare(first)
            })
        }

        isSorted = !isSorted

        return users
    }

    function sortByCoach() {
        var users = window.usersFromGoogleCache

        if (isSorted) {
            users.sort(function (a, b) {
                var first = b.hasOwnProperty('locations') && b.locations[0]?.hasOwnProperty('floorSection') ? b.locations[0].floorSection : "z"
                var second = a.hasOwnProperty('locations') && a.locations[0]?.hasOwnProperty('floorSection') ? a.locations[0].floorSection : "z"

                return second.localeCompare(first)
            })

        } else {
            users.sort(function (a, b) {
                var first = a.hasOwnProperty('locations') && a.locations[0]?.hasOwnProperty('floorSection') ? a.locations[0].floorSection : "z"
                var second = b.hasOwnProperty('locations') && b.locations[0]?.hasOwnProperty('floorSection') ? b.locations[0].floorSection : "z"

                return second.localeCompare(first)
            })
        }

        isSorted = !isSorted

        return users
    }

    function compareArrays(array1, array2) {
        return array2.toString() === array1.toString()
    }

    $('.btn-update-user').on('click', function () {
        loader(true)

        var usersCache = window.usersSpreadsheetCache
        let email = $('#email').text()
        let id = $('#email').attr('data-id')
        var objUser = usersCache.filter(value => value[4] == email)

        console.log('ID: ' + id)

        if (objUser.length > 1 || !objUser) {
            customMessage('User not found')
            loader()
            return
        }

        var admin = objUser[0][5]

        if (admin) {
            customMessage('You do not have permission to edit this user')
            loader()
            return
        }

        var buildingId = objUser[0][18] ? objUser[0][18] : undefined
        let title = $('#profile-title').val() || undefined
        let coach = $(`#profile-coach`).val() || undefined
        let manager = $(`#profile-manager`).val() || undefined
        let workAddress = $(`#work-address`).val() || undefined
        let phone = $(`#phone`).val() || undefined
        let department = $(`#profile-department`).val() || undefined
        let typePhone = $(`#type_phone`).val() || undefined
        var fieldsCache = [
            objUser[0][25] || '',
            objUser[0][11] || '',
            objUser[0][20] || '',
            objUser[0][26] || '',
            objUser[0][18] || '',
            objUser[0][13] || '',
            objUser[0][12] || '',
        ]
        var fieldsChaged = [
            department,
            title,
            coach ? `Coach: ${coach}` : undefined,
            manager,
            workAddress,
            phone,
            typePhone
        ]

        var changes = compareArrays(fieldsCache, fieldsChaged)

        if (changes) {
            // customMessage('Nothing to do!')
            renderPages('users-list')
            loader()
            return
        }

        var data = {}
        manager ? data.relations = [{ "type": 'manager', "value": manager }] : data.relations = [{ "type": 'manager', "value": '' }]
        title ? data.organizations = [{ "title": title }] : data.organizations = [{ "title": '' }]
        department ? data.organizations[0].department = department : data.organizations[0].department = ''
        workAddress ? data.locations = [{ "type": "desk", "area": "desk", "buildingId": workAddress }] : data.locations = [{ "type": "desk", "area": "desk", "buildingId": '' }]
        coach ? data.locations[0].floorSection = `Coach: ${coach}` : data.locations[0].floorSection = ''
        phone ? data.phones = [{ "type": typePhone, "value": phone }] : data.phones = [{ "type": '', "value": '' }]

        /*/*google.script.run.withSuccessHandler(function (result) {

            if (!result.status) {
                loader()
                customMessage(result.message)
                return
            }

            loader()
            customMessage(result.message)
            updateUsersList(JSON.parse(result.data))
            renderPages('users-list')

        }).withFailureHandler(function (e) {

            loader()
            customMessage(e)

        }).updateUserAPI(id, data)*/
    })

    $('.brand-logo').on('click', function () {
        bringUsersOnHome()
    })

    $('.search-type input').on('keydown', function (e) {

        if (e.keyCode === 10 || e.keyCode === 13) {
            e.preventDefault()
        }

        var textTyped = $(this).val()
        var usersToFilter = window.usersFromGoogleCache
        var users = usersToFilter.filter(function (a) {
            var coach = a.hasOwnProperty('locations') && a.locations[0].hasOwnProperty('floorSection') ? a.locations[0].floorSection : ""
            var test = coach.toLowerCase().includes(textTyped.toLowerCase())
            return a.name.fullName.toLowerCase().includes(textTyped.toLowerCase()) || test
        })

        fillTableUsers(users)
    })

    $('#profile-department').on('change', function () {
        var indexSelected = $(this).prop('selectedIndex')

        if (!indexSelected == 0) {
            return
        }

        $('#add-new-department-modal').modal('open')
    })

    $('#profile-title').on('change', function () {
        var indexSelected = $(this).prop('selectedIndex')

        if (!indexSelected == 0) {
            return
        }

        $('#add-new-title-modal').modal('open')
    })

    $('.btn-confirm-department').on('click', function () {
        loader(true)
        var department = $('#new-department').val()
        var email = $('.name-email p').text()

        /*google.script.run.withSuccessHandler(function (result) {

            if (!result.status) {
                customMessage(result.message)
                loader()
                return
            }

            $('#profile-department').append(`
                <option value="${department}">${department}</option>
            `)
            $('#profile-department').val(department)
            $('#profile-department').formSelect()
            customMessage(result.message)
            loader()

        }).withFailureHandler(function (e) {

            customMessage(e)
            loader()

        }).insertDepartmentToSpreadsheetAPI(department)*/

    })

    $('.btn-confirm-title').on('click', function () {
        loader(true)
        var title = $('#new-title').val()

        /*google.script.run.withSuccessHandler(function (result) {

            if (!result.status) {
                customMessage(result.message)
                loader()
                return
            }

            $('#profile-title').append(`
                <option value="${title}">${title}</option>
            `)
            $('#profile-title').val(title)
            $('#profile-title').formSelect()
            customMessage(result.message)
            loader()

        }).withFailureHandler(function (e) {

            customMessage(e)
            loader()

        }).insertTitleToSpreadsheet(title)*/
    })

    $('.project-number').on('keyup', function () {
        var projectNumber = $('.project-number').val().trim()
        var projectName = $('.project-name').val().trim().replace(' ', '-')
        var id = projectNumber ? `${projectNumber}-${projectName}` : projectName
        $('.building-id').val('')
        $('.building-id').val(id)
    })

    $('.project-name').on('keyup', function () {
        var projectNumber = $('.project-number').val().trim()
        var projectName = $('.project-name').val().replace(/ /g, '-')
        var id = projectNumber ? `${projectNumber}-${projectName}` : projectName
        $('.building-id').val('')
        $('.building-id').val(id)
    })

    $('#active-process').on('click', function () {
        submissionsHRFromSpreadsheet()
    })


    $('.nav-bar-pages').on('click', 'li', function () {

        var elementSelected = $(this)
        var elementText = $(this).text()
        var menuSettings = elementText == 'Settings'

        $(this).closest('ul').find('li').each((index, element) => {

            if ($(element).text() == elementText && !menuSettings) {
                $(element).addClass('active')
            } else {
                $(element).removeClass('active')
            }

        })

    })

    $('.people-builder-list-menu').on('click', function () {
        submissonsPeopleBuilderFromSpreadsheet()
    })

}

function bringDepartament() {

    /*google.script.run.withSuccessHandler(function (result) {

        result.sort((a, b) => { return a[0].localeCompare(b[0]) })
        for (let index = 0; index < result.length; index++) {
            const element = result[index]
            $('#profile-department').append(`
                <option value="${element}">${element}</option>
            `)
        }

        $('select').formSelect()

    }).withFailureHandler(function (e) {

        customMessage(e)

    }).bringDepartamentAPI()*/
}

function bringTitles() {

    /*google.script.run.withSuccessHandler(function (result) {

        result.sort((a, b) => { return a[0].localeCompare(b[0]) })
        for (let index = 0; index < result.length; index++) {
            const element = result[index]
            $('#profile-title').append(`
                    <option value="${element}">${element}</option>
                `)
        }

        $('select').formSelect()

    }).withFailureHandler(function (e) {

        customMessage(e)

    }).bringTitlesAPI()*/
}

function bringCoaches() {

    /*google.script.run.withSuccessHandler(function (result) {

        for (let index = 0; index < result.length; index++) {

            var element = result[index]

            $('#profile-coach').append(`
                <option value="${element}">${element}</option>
            `)

        }

        $('select').formSelect()

    }).withFailureHandler(function (e) {

        customMessage(e)

    }).bringCoachesAPI()*/
}

function bringManagers() {

    /*google.script.run.withSuccessHandler(function (result) {

        for (let index = 0; index < result.length; index++) {
            var element = result[index]
            $('#profile-manager').append(`
                <option value="${element}">${element}</option>
            `)
        }

        $('#profile-manager').formSelect()

    }).withFailureHandler(function (e) {

        customMessage(e)

    }).bringManagersAPI()*/
}

$('.pb-settings-menu').on('click', function () {
    renderPages('settings_pb')
})

$(document).on('change', '.checkbox_yes', function () {
    var check = $(this).prop('checked')

    if (check) {
        $('.checkbox_no').prop('checked', false)
        $('#meeting_date').show()
    } else {
        $('#meeting_date').hide()
    }

})

$(document).on('change', '.checkbox_no', function () {
    var check = $(this).prop('checked')

    if (check) {
        $('.checkbox_yes').prop('checked', false)
        $('#meeting_date').hide()
    } else {
        $('#meeting_date').show()
    }

})

$('.toggle_goal_status').find('input[type="checkbox"]').on('change', function (e) {
    var toggle = $(this).prop('checked')

    if (toggle) {
        $('.draft').removeClass('yellow')
        $('.ready').addClass('green')
    } else {
        $('.draft').addClass('yellow')
        $('.ready').removeClass('green')
    }

})

$('.toggle_goal_status_coach').find('input[type="checkbox"]').on('change', function (e) {
    var toggle = $(this).prop('checked')

    if (toggle) {
        $('.revision').removeClass('yellow')
        $('.approved').addClass('green')
    } else {
        $('.revision').addClass('yellow')
        $('.approved').removeClass('green')
    }

})

$('.btn-confirm-work-location').on('click', function () {
    loader(true)
    var buildingID = $('.building-id').val()
    var projecNumber = $('.project-number').val()
    var projecName = $('.project-name').val()
    var description = $('.description').val()
    var buildingName = `${projecNumber} ${projecName}`
    var data = {
        buildingId: buildingID,
        buildingName: buildingName,
        description: description
    }

    /*google.script.run.withSuccessHandler(function (result) {

        if (!result.status) {
            customMessage(result.message)
            loader()
            return
        }

        var pageIsBlock = $('.profile-page').css('display') == 'none' ? false : true

        if (pageIsBlock) {
            $('#work-address').append(`
                <option value="${buildingID}">${projecName}</option>
            `)
            $('#work-address').val(buildingID)
            $('#work-address').formSelect()
        }

        customMessage(result.message)
        loader()

    }).withFailureHandler(function (e) {

        customMessage(e)
        loader()

    }).insertBuilding(data)*/
})

$('#work-address').on('change', function () {
    var indexSelected = $(this).prop('selectedIndex')

    if (!indexSelected == 0) {
        return
    }

    $('#add-new-location-modal').modal('open')
})

function hideMenuOptions() {
    // var access = window.hasAccess
    var access = 'admin'
    $('.menu').each(function (index, element) {
        if ($(element).hasClass(access)) {
            $(element).show()
        } else {
            $(element).hide()
        }
    })

}

function getUser() {
    /*google.script.run.withSuccessHandler((result) => { }).getUserByEmailAPI()*/
}

$('.btn-confirm-suspend').on('click', function () {
    loader(true)
    var users = window.usersFromGoogleCache
    let id = $('#email').attr('data-id')
    var user = users.filter(value => value.id == id)

    if (user.length > 1 || !user) {
        customMessage('User not found')
        loader()
        return false
    }

    console.log('ID: ' + id)

    /*google.script.run.withSuccessHandler(function (result) {

        if (!result.status) {
            loader()
            customMessage(result.message)
            return
        }

        loader()
        customMessage(result.message)
        user[0].suspended = !user[0].suspended
        updateUsersList(user[0])
        renderPages('users-list')

    }).withFailureHandler(function () {

        loader()
        customMessage(e)

    }).suspendUser(user)*/
})

function updateUsersList(user) {

    $('.tbody-users tr').each(function () {
        var email = $(this).find('.td_email').text()
        if (email == user.primaryEmail) {
            if (user.suspended) {
                $(this).css({
                    'background-color': '#A6A8AB',
                    'color': 'white'
                })
            } else {
                $(this).css({
                    'background-color': 'white',
                    'color': 'rgba(0,0,0,0.87)'
                })
            }

            $(this).find('.td_title').text(user.organizations[0].title)
            $(this).find('.td_manager').text(user.relations[0].value)
            $(this).find('.td_coach').text(user.locations[0].floorSection?.replace('Coach: ', ''))
            $(this).find('.td_address').text(user.locations[0].buildingId?.replace(/-/g, ' '))
            $(this).find('.td_address').attr('data-id', user.locations[0].buildingId)
            $(this).find('.td_phone').text(user.phones[0].value)
            $(this).find('.td_phone').attr('phone-type', user.phones[0].type)
            $(this).find('.td_department').text(user.organizations[0].department)
        }
    })
}

function getLoggedUserAPI() {
    return new Promise((resolve, reject) => {
        /*google.script.run.withSuccessHandler(function (result) {
            resolve(result)
            window.userLoggedCache = result
            $('.user-logged-name').text(result.name)
            $('.image-logged-user').attr('src', result.photo)

        }).withFailureHandler(function (e) {

            reject(e)
            customMessage(e)

        }).getLoggedUser()*/
    })
}

$('.etro-team').on('click', function () {
    bringUsersOnHomeFromSpreadsheet()
})

$('.offboard').on('click', function () {
    renderPages('offboard')
})

function createTableEtroTeamFromSpreadsheet(users) {
    $('.tbody-users').empty()

    users.forEach((element, index) => {
        var fullName = element[3] || ""
        var id = element[0] || ""
        var photo = element[24] || "https://www.gstatic.com/images/branding/product/2x/avatar_square_grey_48dp.png"
        var email = element[4]
        var manager = element[26]
        var title = element[11]
        var department = element[25]
        var coach = element[20]
        var coach = coach?.replace('Coach: ', "")
        var admin = element[5] ? element[5] : element[6]
        var address = element[18].replace(/-/g, ' ')
        var addressId = element[18]
        var phone = element[13]
        var phoneType = element[12]
        var suspended = element[9]

        $('.tbody-users').append(`
            <tr ${suspended ? "style='background-color: #A6A8AB; color: white;'" : ""}>
                <td class="td_image_fullname" style="
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                    ">
                    <img class="responsive-img circle" src="${photo}" style="max-width: 18%; margin-right: 20px;"/>
                    ${fullName}
                    ${admin ? '<img src="https://iili.io/Jazab4a.png" class="icon-admin" />' : ''}
                </td>
                <td class="td_email" data-id="${id}">${email}</td>
                <td class="td_title" >${title}</td>
                <td class="td_department">${department}</td>
                <td class="td_manager" >${manager}</td>
                <td class="td_coach" >${coach}</td>
                <td class="td_address" data-id="${addressId}">${address}</td>
                <td class="td_phone" phone-type="${phoneType}">${phone}</td>
            </tr>
        `)
    })

    loader()
}

function bringUsersOnHomeFromSpreadsheet() {

    loader(true)
    $('.etro-team').closest('li').addClass('active')
    renderPages('users-list')

    createTableEtroTeamFromSpreadsheet(window.usersSpreadsheetCache)

}



function usersFromSpreadsheet(users) {
    return new Promise((resolve, reject) => {
        /*google.script.run.withSuccessHandler(function (result) {
            resolve(result)

            if (!result.status) {
                customMessage('Users not found')
            }

            var users = JSON.parse(result.data)
            window.usersSpreadsheetCache = users

        }).withFailureHandler(function (e) {

            reject(e)

        }).usersFromSpreadsheetAPI(users)*/

    })

}

function getGoals(users) {
    return new Promise((resolve, reject) => {
        /*google.script.run.withSuccessHandler(function (result) {

            resolve(result)

            if (!result.status) {
                customMessage('Users not found')
            }

            var users = JSON.parse(result.data)
            window.goalsCache = users

        }).withFailureHandler(function (e) {

            reject(e)

        }).getGoalsAPI(users)*/
    })

}

function goalsComments(users) {
    return new Promise((resolve, reject) => {
        /*google.script.run.withSuccessHandler(function (result) {

            resolve(result)

            if (!result.status) {
                customMessage('Users not found')
            }

            var comments = JSON.parse(result.data)
            window.goalsCommentsCache = comments

        }).withFailureHandler(function (e) {

            reject(e)

        }).goalsCommentsAPI(users)*/
    })

}

// $('#search-name').on('keyup', function (e) {

//     if (e.keyCode === 10 || e.keyCode === 13) {
//         e.preventDefault()
//     }

//     var textTyped = $(this).val().toLowerCase().trim()
//     var usersToFilter = window.goalsCache

//     if (!textTyped) {
//         createCardCollapseToPB(usersToFilter)
//         window.playersFiltered = users
//         return
//     }

//     var users = usersToFilter.filter(function (value) {
//         var coach = value[3].toLowerCase()
//         var player = value[2].toLowerCase()
//         return player.includes(textTyped.toLowerCase()) || coach.includes(textTyped)
//     })

//     window.playersFiltered = users
//     createCardCollapseToPB(users)
// })

$('.draft_goal_checkbox').on('change', function () {
    filterPb()
})

$('.ready_approval_checkbox').on('change', function () {
    filterPb()
})

$('.needs_revision_checkbox').on('change', function () {
    filterPb()
})

$('.active_checkbox').on('change', function () {
    filterPb()
})

$('.pb_year_filter').on('change', function () {
    filterPb()
})

$('#search-name').on('change', function () {
    filterPb()
})

function filterPb() {
    var yearSelected = $('.pb_year_filter').find('option:selected').text()
    var namesInGoals = []
    var searchedName = $('#search-name').val()
    var draft = $('.draft_goal_checkbox').prop('checked')
    var readyApproval = $('.ready_approval_checkbox').prop('checked')
    var needs_revision = $('.needs_revision_checkbox').prop('checked')
    var active = $('.active_checkbox').prop('checked')
    var status = []

    if (draft) {
        status.push('Draft Goal')
    }

    if (readyApproval) {
        status.push('Ready for Approval')
    }

    if (needs_revision) {
        status.push('Needs Revision')
    }

    if (active) {
        status.push('Active')
    }

    if (!status.length) {
        status.push('All')
    }

    if (yearSelected == 'All') {
        var yearSelected = []
        $('.pb_year_filter').find('option').each(function (index, element) {
            if (index) {
                yearSelected.push($(this).val())
            }
        })
    }

    var usersToFilter = window.usersSpreadsheetCache

    if (pageActive == 'Team Goal') {
        var goals = window.goalsCache
        var userLogged = window.userLoggedCache
        var goalsToFilter = goals.filter(value => value[4].includes(userLogged.name))
    } else {
        var goalsToFilter = window.goalsCache
    }

    var filteredGoals = goalsToFilter.filter((value) => {
        var byName = searchedName.toLowerCase().includes(value[3].toLowerCase()) || searchedName == ''
        var byYear = yearSelected.includes(value[1].toString())
        var byStatus = status.includes(value[13]) || status.includes('All')

        return byName && byYear && byStatus
    })

    filteredGoals.map((value) => {
        namesInGoals.push(value[3])
    })

    var filteredUsers = usersToFilter.filter((value) => namesInGoals.includes(value[3]))

    window.playersFiltered = filteredUsers
    createCardCollapseToPB(filteredUsers, filteredGoals)
}

$(document).on('click', '.checkbox_print_goals', function () {
    var year
    var player

    $(this).closest('.table_goals').find('tbody').find('tr').each((index, element) => {
        year = $(element).find('td[data-year]').data('year')
        player = $(element).find('td[data-id]').data('player')

    })

    loader(true)
    /*google.script.run.withSuccessHandler(function (result) {

        if (result) {
            $('.url_pdf').text('')
            $('.url_pdf').closest('a').attr('href', '')
            $('.url_pdf').closest('a').attr('href', result)
            $('.url_pdf').text(result)
            $('#modal_url_pdf').modal('open')
        }

        loader()


    }).withFailureHandler(function (e) {

        console.log(e)
        loader()

    }).goals2Pdf(year, player)*/

})

function collapsibleHeader(dataCollapsibleHeader) {

    var element = `
                <div data-coach-email="${dataCollapsibleHeader.coachEmail}" 
                    data-year="${dataCollapsibleHeader.year}" 
                    data-player-email="${dataCollapsibleHeader.playerEmail}" 
                    class="collapsible-header collapsible_pb_header">
                ${dataCollapsibleHeader.elementPhoto}
                <div>Status:
                    <div class="chip ${dataCollapsibleHeader.colorClass}"
                        <span>${dataCollapsibleHeader.pbStatus}</span>
                    </div>
                </div>
                <div>Qty of Goals:
                    <span>${dataCollapsibleHeader.qtyGoals}</span>
                </div>
                <div>Create On:
                    <span>${dataCollapsibleHeader.createOn}</span>
                </div>
                
                <div>% Completion:
                    <span>${dataCollapsibleHeader.percentCompleted}</span>
                </div>
            </div>
    `

    // <div>Last Check-in:
    //                 <span>${dataCollapsibleHeader.lastCheckin?.split('T')[0]}</span>
    //             </div>

    return element
}

function createCheckinOneToOne(checkin) {
    return `<div class="card" style="margin-top: 0%; padding-bottom: 0px;">
                <div class="card-title card_title_mygoals">
                    <b><span>Monthly 1:1</span></b>
                </div>
                <div class="card-content">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>1:1 Meeting</th>
                                <th>Check-in Date</th>
                                <th>Check-in Status</th>
                                <th>Goals Status</th>
                                <th>% Completion</th>
                                <th><span class="material-symbols-outlined">print</span></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <div class="card-action">
                        <div class="row" style="margin-bottom: 0px;">
                            <a class="waves-effect waves-light">
                                <i class="grey-text material-icons">add_circle</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
    `
}

function createRequiredCheckin() {
    var element = `<div class="card" style="margin-top: 0%; padding-bottom: 0px;">
                <div class="card-title card_title_mygoals">
                    <b><span>Required Review</span></b>
                </div>
                <div class="card-content">
                    <table>
                        <thead>
                            <tr>
                                <th>Reviews</th>
                                <th>Check-in Date</th>
                                <th>Check-in Status</th>
                                <th>Goals Status</th>
                                <th>1:1 Meeting?</th>
                                <th>% Completion</th>
                                <th><span class="material-symbols-outlined">print</span></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <div class="card-action">
                        <div class="row" style="margin-bottom: 0px;">
                            <a class="waves-effect waves-light">
                                <i class="grey-text material-icons">add_circle</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
    `

    return element
}

// function createCheckinFinal(checkinFinal) {
//     var element = `<div class="card" style="margin-top: 0%; padding-bottom: 0px;">
//                 <div class="card-title card_title_mygoals">
//                     <b><span>Final Review</span></b>
//                 </div>
//                 <div class="card-content">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Select To Print</th>
//                                 <th>Check-in Date</th>
//                                 <th>Check-in Status</th>
//                                 <th>Goals Status</th>
//                                 <th>% Completion</th>
//                                 <th><span class="material-symbols-outlined">print</span></th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                         </tbody>
//                     </table>
//                     <div class="card-action">
//                         <div class="row" style="margin-bottom: 0px;">
//                             <a class="waves-effect waves-light">
//                                 <i class="grey-text material-icons">add_circle</i>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//     `

//     return element
// }

function createGoalsTd(data) {
    var typeAccess = window.hasAccess // common, admin or null
    var tdGoals = ''
    var player = data.goal[0][3]
    var dinamicElement = window.userLoggedCache.name == player || typeAccess == 'admin'

    var btnNewGoalElement = dinamicElement ? `
                            <div class="card-action">
                                <div class="row" style="margin-bottom: 0px;">
                                    <a class="btn-new-goal waves-effect waves-light">
                                        <i class="grey-text material-icons">add_circle</i>
                                    </a>
                                </div>
                            </div>` : ''
    var btnDeleteGoalElement = dinamicElement ? '<td class="delete_goal"><span class="material-symbols-outlined">delete</span></td>' : '<td></td>'
    data.goal.forEach((value) => {

        if (!value[5]) {
            return
        }

        tdGoals += `
            <tr>
                <td class="check-box">
                    <p>
                        <label>
                            <input class="" type="checkbox" />
                        </label>
                    </p>
                </td>
                <td data-year="${value[1]}" data-coach="${value[4]}" data-player="${value[3]}" data-id="${value[0]}" class="title" >${value[5]}</td>
                <td class="type">${value[6]}</td>
                <td class="target_date">${value[11]?.split('T')[0]}</td>
                <td class="status">${value[13]}</td>
                <td class="last_checkin">${value[15]?.split('T')[0]}</td>
                <td class="completion">${value[14]}</td>
                ${btnDeleteGoalElement}
            </tr>
        `
    })

    var element = `<div class="card" style="margin-top: 0%; padding-bottom: 0px;">
                <div class="card-title card_title_mygoals">
                    <b><span>${data.textMyGoals}</span></b>
                </div>
                <div class="card-content">
                    <table class="table_goals highlight">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Goal Title</th>
                                <th>Goal Type</th>
                                <th>Target Date</th>
                                <th>Status</th>
                                <th>Last Check-in</th>
                                <th>% Completion</th>
                                <th><span class="checkbox_print_goals material-symbols-outlined">print</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tdGoals}
                        </tbody>
                    </table>
                    ${btnNewGoalElement}                        
                </div>
            </div>
    `
    return element
}

function deleteGoalAsync(id) {
    return new Promise((resolve, reject) => {
        /*google.script.run.withSuccessHandler(async function (result) {

            resolve(result)

            if (!result.status) {
                loader()
                return
            }

            customMessage(result.message)

        }).withFailureHandler(function (e) {

            reject(e)
            customMessage(result.message)
            console.log(e)
            loader()

        }).deleteGoalAPI(id)*/
    })
}

$(document).on('click', '.delete_goal', async function () {
    loader(true)
    var id = $(this).closest('tr').find('.title').attr('data-id')
    deleteGoalAsync(id)
    getGoals()

    if (pageActive == 'Team Goal') {
        teamGoals()
        loader()
    } else if (pageActive == 'Personal Goal') {
        personalGoals()
        loader()
    } else {
        companyGoals()
        loader()
    }


})

function createElementAdditionalInfo(id) {
    var goalsComments = window.goalsCommentsCache
    var goalsCommentsFiltered = goalsComments.filter(value => value[0] == id)
    var checkboxYesStatus
    var meetingDate
    var playersComments
    var coachsComments
    goalsCommentsFiltered.length ? checkboxYesStatus = goalsCommentsFiltered[0][6] || false : false
    goalsCommentsFiltered.length ? meetingDate = new Date(goalsCommentsFiltered[0][7]).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }) || false : false
    goalsCommentsFiltered.length ? playersComments = goalsCommentsFiltered[0][8] || false : false
    goalsCommentsFiltered.length ? coachsComments = goalsCommentsFiltered[0][9] || false : false

    if (checkboxYesStatus && (playersComments || coachsComments)) {
        return `
                <div class="has_comments_meeting right">
                    <a 
                        id="additional_info"
                        class="modal-trigger tooltipped" href="#modal_additional_info"
                        data-position="bottom"
                        data-tooltip="Goal Setting Additional Information">
                        <i class="right material-icons">info</i>
                    </a>
                    <p class="right" style="font-size: 10px;">
                        Meeting 1:1 on ${meetingDate}
                    </p>
                </div>`
    } else if (checkboxYesStatus && !playersComments && !coachsComments) {
        return `
                <div class="has_meeting right">
                    <a 
                        id="additional_info"
                        class="modal-trigger tooltipped" href="#modal_additional_info"
                        data-position="bottom"
                        data-tooltip="Goal Setting Additional Information">
                        <i class="right material-icons">info</i>
                    </a>
                    <p class="right" style="font-size: 10px;">
                        Meeting 1:1 on ${meetingDate}
                    </p>
                </div>`
    } else if (!checkboxYesStatus && !playersComments && !coachsComments) {
        return `
                <div class="has_no_comments_no_meeting right">
                    <a 
                        id="additional_info"
                        class="modal-trigger tooltipped" href="#modal_additional_info"
                        data-position="bottom"
                        data-tooltip="Goal Setting Additional Information">
                        <i class="right material-icons">info</i>
                    </a>
                    <p class="right" style="font-size: 10px;">
                        No Meeting 1:1
                    </p>
                </div>`
    } else {
        return `
                <div class="has_comments right">
                    <a 
                        id="additional_info"
                        class="modal-trigger tooltipped" href="#modal_additional_info"
                        data-position="bottom"
                        data-tooltip="Goal Setting Additional Information">
                        <i class="right material-icons">info</i>
                    </a>
                    <p class="right" style="font-size: 10px;">
                        No Meeting 1:1
                    </p>
                </div>`
    }

}

function createCardCollapseToPB(users, goals) {

    $('.collapse-people-builder').children().remove()
    var userLogged = window.userLoggedCache.name

    renderPages('pb-personal-goals')

    for (var i = 0; i < users.length; i++) {
        var userGoals = goals.filter(value => value[3] == users[i][3])

        if (!userGoals.length) {
            return
        }

        var coach = users[i][20]?.replace('Coach: ', '')
        var player = users[i][3]
        var playerEmail = users[i][4]
        var coachEmail = users[i][26]
        var photo = ''
        users[i][24] ? photo = users[i][24] || "https://www.gstatic.com/images/branding/product/1x/avatar_square_grey_48dp.png" : photo = "https://www.gstatic.com/images/branding/product/1x/avatar_square_grey_48dp.png"

        userGoals.sort((a, b) => {

            if (a[1] === b[1]) {
                return a[3].localeCompare(b[3])
            } else {
                return a[1] - b[1]
            }

        })

        var lastCheckin = userGoals[0][15]
        var percentCompleted = `${userGoals[0][14]}%`
        var yearGoals = []

        userGoals.map((value) => {

            if (!yearGoals.includes(value[1])) {
                yearGoals.push(value[1])
            }

        })

        yearGoals = yearGoals.sort((a, b) => b - a)

        for (var j = 0; j < yearGoals.length; j++) {
            var goal = userGoals.filter(value => value[1] == yearGoals[j])
            var userGoalStatus = []
            var goalsCommentsId = goal[0][18]

            goal.map((value) => {

                if (!userGoalStatus.includes(value[13])) {
                    userGoalStatus.push(value[13])
                }

            })

            if (userGoalStatus.includes('Draft Goal')) {
                var pbStatus = 'Draft Goal'
            } else if (userGoalStatus.includes('Ready for Approval')) {
                var pbStatus = 'Approval'
            } else if (userGoalStatus.includes('Needs Revision')) {
                var pbStatus = 'Approval'
            } else if (userGoalStatus.includes('Active')) {
                var pbStatus = 'Active'
            } else {
                var pbStatus = 'Draft Goal'
            }

            if (!userGoalStatus.includes('') && !userGoalStatus.includes('Draft Goal') && !userGoalStatus.includes('Ready for Approval') && !userGoalStatus.includes('Needs Revision')) {
                var elementAdditionalInfo = createElementAdditionalInfo(goalsCommentsId)
            } else {
                var elementAdditionalInfo = ''
            }

            var realQtyGoals = goal.filter(value => value[6])
            var createOn = goal[0][2].split('T')[0]
            var qtyGoals = realQtyGoals.length
            qtyGoals == 0 ? pbStatus = 'No Goal' : pbStatus = pbStatus
            var dataCollapsibleHeader = { pbStatus, qtyGoals, createOn, lastCheckin, percentCompleted, coachEmail, playerEmail }
            dataCollapsibleHeader.year = goal[0][1]

            if (pbStatus == 'Draft Goal' || pbStatus == 'Approval') {
                var colorClass = 'yellow lighten-3'
            } else if (pbStatus == 'No Goal') {
                var colorClass = 'red lighten-3'
            } else if (pbStatus == 'Active') {
                var colorClass = 'green lighten-3'
            } else {
                var colorClass = ''
            }

            dataCollapsibleHeader.colorClass = colorClass

            if (users.length == 1 && users[0][3] == userLogged) {
                var elementPhoto = `<div data-id-comments="${goalsCommentsId}" style="display: flex; justify-content: space-evenly; align-items: baseline; width: 100px;">
                                        Year:
                                        <span>
                                            ${dataCollapsibleHeader.year}
                                        </span>
                                    </div>
                                    `
                var textMyGoals = 'My Goals'
            } else {
                var elementPhoto = `<div data-id-comments="${goalsCommentsId}" style="display: flex; justify-content: space-between; align-items: center; width: 270px;">
                                        <img style="width: 48px;" class="circle"
                                            src="${photo}"
                                            alt=""></img>
                                        <span style="margin-left: 10px;">${player}</span><br>
                                        <div>
                                            ${dataCollapsibleHeader.year}
                                        </div>
                                    </div>
                                    `
                var textMyGoals = 'Goals'
            }

            dataCollapsibleHeader.elementPhoto = elementPhoto
            var data = { goal, textMyGoals }

            $('.collapse-people-builder').append(`
                <li>
                    ${collapsibleHeader(dataCollapsibleHeader)}
                    <div class="collapsible-body">
                        <div class="row">
                            ${elementAdditionalInfo}
                            ${createGoalsTd(data)}
                        </div>
                    </div>
                </li>
            `)

            // ${createCheckinOneToOne()}
            // ${createRequiredCheckin()}
        }
        $('.tooltipped').tooltip()
    }

    $('.dropdown-trigger').dropdown()
    // saveHtmlToPdf()
}

$('.btn_cancel_new_goal').on('click', function () {
    renderPages('pb-personal-goals')
})

$(document).on('click', '#additional_info', function () {

    var year = $(this).closest('.collapse-people-builder').find("td[data-year]").data("year")
    var player = $(this).closest('.collapse-people-builder').find("td[data-player]").data("player")
    var coach = $(this).closest('.collapse-people-builder').find("td[data-coach]").data("coach")
    var commentId = $(this).closest('li').find("div[data-id-comments]").data("id-comments")

    fillFormAdditionalInfo(commentId)

    var data = {
        year: year,
        player: player,
        coach: coach,
        comment_id: commentId
    }

    var goalsId = []

    $(this).closest('.collapsible-body').find('.table_goals tbody').find('td:nth-child(2)').each((index, element) => {
        goalsId.push($(element).attr('data-id'))
    })

    data.goals_id = goalsId
    window.additionalInfoGoalCache = data
    M.updateTextFields()

})

function fillFormAdditionalInfo(commentId) {
    cleanFormAdditionalInfo()

    var goalsComments = window.goalsCommentsCache
    console.log('commentsId', commentId)
    console.log('goalsComments', goalsComments)

    if (goalsComments.length) {
        var goalsCommentsFiltered = goalsComments.filter(value => commentId.includes(value[0]))

        console.log('goalsCommentsFiltered', goalsCommentsFiltered)

        if (goalsCommentsFiltered.length) {
            var meetingDate = new Date(goalsCommentsFiltered[0][7]).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            }) || ''
            var statusCheckboxYes = goalsCommentsFiltered[0][6]
            var playerComments = goalsCommentsFiltered[0][8]
            var coachComments = goalsCommentsFiltered[0][9]

            $('.checkbox_yes').prop('checked', statusCheckboxYes)
            $('.checkbox_yes').trigger('change')
            $('.checkbox_no').prop('checked', !statusCheckboxYes)
            $('#meeting_date').val(meetingDate)
            $('#player_comments_textarea').val(playerComments)
            $('#coachs_comment_textarea').val(coachComments)
        }
    }
}

function sendMessageAdditionalInfo(data) {

    /*google.script.run.withSuccessHandler(function (result) {

        if (!result.status) {
            customMessage(result.message)
            loader()
        }

    }).withFailureHandler(function (e) {

        console.log(e)
        customMessage(e)
        loader()

    }).sendMessageAdditionalInfoAPI(data)*/
}

function sendMessageGoalsNeedRevision(data, goalsNeedsRevision) {

    /*google.script.run.withSuccessHandler(function (result) {

        if (!result.status) {
            customMessage(result.message)
            loader()
        }

    }).withFailureHandler(function (e) {

        console.log(e)
        customMessage(e)
        loader()

    }).sendMessageGoalsNeedRevisionAPI(data, goalsNeedsRevision)*/
}

function cleanFormAdditionalInfo() {
    $('.checkbox_yes').find('input').prop('checked', false)
    $('.checkbox_no').find('input').prop('checked', false)
    $('#meeting_date').val('')
    $('#player_comments_textarea').val('')
    $('#coachs_comment_textarea').val('')
    $('#modal_additional_info').attr('data-id', '')

}

function saveComments(id, data) {

    /*google.script.run.withSuccessHandler(async function (result) {

        if (!result.status && !result.id) {
            customMessage(result.message)
            loader()
            return
        }

        for (var i = 0; i < data.id_comments_goals.length; i++) {
            /*google.script.run.withSuccessHandler(function (result) {


            }).withFailureHandler(function (e) {


            }).saveGoalAPI(data.id_comments_goals[i], { id_comments: result.id })
        }

         goalsComments()
         getGoals()

        if (pageActive == 'Team Goal') {
            teamGoals()
        } else if (pageActive == 'Personal Goal') {
            personalGoals()
        } else {
            companyGoals()
        }


    }).withFailureHandler(function (e) {

        console.log(e)
        customMessage(e.message)
        loader()

    }).saveCommentsAPI(id, data)*/
}

$('.confirm_new_comments').on('click', function () {
    var year = window.additionalInfoGoalCache.year
    var coach = window.additionalInfoGoalCache.coach
    var player = window.additionalInfoGoalCache.player
    var checkBox = $('.checkbox_yes').prop('checked')
    var meetingDate = $('#meeting_date').attr('data-meeting-date')
    var playersComments = $('#player_comments_textarea').val()
    var coachComments = $('#coachs_comment_textarea').val()
    var id_comments_goals = window.additionalInfoGoalCache.goals_id
    var id = window.additionalInfoGoalCache.comment_id
    var data = {
        year: year,
        player: player,
        coach: coach,
        checkbox_yes: checkBox,
        meeting_date: meetingDate,
        players_comments: playersComments,
        coachs_comments: coachComments,
        id_comments_goals: id_comments_goals
    }

    window.additionalInfoGoalCache = null

    cleanFormAdditionalInfo()
    loader(true)

    saveComments(id, data)

})

function cleanGoalFormFields() {

    $('#goal_name').val('')
    $('.goal_term_select').val('')
    $('#why_is_important').val("")
    $('#why_is_important').trigger('change')
    $('.goals_related').val("")
    $('#relation_between').val('')
    $('.target_date').val('')
    $('.toggle_goal_status').find('input').prop('checked', false)
    $('.ready').removeClass('green')
    $('.draft').addClass('yellow')
    $('select').formSelect()
    $('.card-content-steps').find('.steps').each(function (index, element) {

        if (index) {
            removeDivStep($(element).find('i'))
        } else {
            $(element).find('textarea').val('')
        }

    })
    $('.coach_comments').find('textarea').val('')

}

function validFiels(data) {
    var fieldsElementl = {
        goal_name: $('.helper_text_goal_name'),
        goal_term: $('.helper_text_goal_term'),
        significance: $('.helper_text_why_is_important'),
        goals_etro: $('.helper_text_goals_related'),
        relationship: $('.helper_text_relation_between'),
        target_date: $('.helper_text_target_date'),
        steps: $('.helper_text_steps')
    }


    var emptySteps = data.steps.filter(value => value != "")
    var emptyKeys = Object.keys(data).filter(value => !data[value].length)
    var emptyFields = emptyKeys.map(value => fieldsElementl[value])
    !emptySteps.length ? $(fieldsElementl.steps).show() : $(fieldsElementl.steps).hide()
    emptyFields.forEach((element) => {
        $(element[0]).show()
    })

    if (emptyKeys.length) {
        return true
    }

    return false
}

$('.btn_confirm_new_goal').on('click', function () {
    var player = $('.player_name').text()
    // var playerFirstName = $('.player_name').text().split(' ')[0]
    var coachFirstName = $('.coach_name').text().split(' ')[0]
    var coach = $('.coach_name').text()
    var coachEmail = $('.collapsible_pb_header').attr('data-coach-email') || $('.player_name').attr('data-coach-email')
    var playerEmail = $('.collapsible_pb_header').attr('data-player-email') || $('.player_name').attr('data-player-email')
    var goalName = $('#goal_name').val()
    var goalTerm = $('.goal_term_select').val()
    var whyIsImportant = $('#why_is_important').val()
    var goalsRelated = $('.goals_related').val()
    var relationBetween = $('#relation_between').val()
    var targetDate = $('.target_date').attr('data-date') || $('.datepicker-modal').find('input').attr('data-date') || ""
    var goalToApproval = $('.toggle_goal_status').find('input').prop('checked')
    var goalApproved = $('.toggle_goal_status_coach').find('input').prop('checked')
    var isCoach = coach == window.userLoggedCache.name

    if (isCoach) {

        if (goalApproved) {
            var goalStatus = 'Active'
            var approvedDate = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            })
        } else {
            var goalStatus = 'Needs Revision'
        }

    } else {

        if (goalToApproval) {
            var goalStatus = 'Ready for Approval'
        } else {
            var goalStatus = 'Draft Goal'
        }

    }

    var steps = []
    var completion = 0
    var year = $('.year_goal').find('.year').text()
    var coachComments = $('.coach_comments').find('textarea').val()
    var id = $('.player_name').attr('data-id')

    $('.card-content-steps').find('.steps').each(function () {
        var stepValue = $(this).find('textarea').val()
        if (stepValue) {
            steps.push(stepValue)
        }
    })

    let data = {
        goal_name: goalName,
        goal_term: goalTerm,
        significance: whyIsImportant,
        goals_etro: goalsRelated,
        relationship: relationBetween,
        target_date: targetDate,
        steps: steps
    }

    if (goalStatus == 'Ready for Approval') {
        var hasEmptyFields = validFiels(data)
    } else {
        var hasEmptyFields = false
    }

    if (hasEmptyFields) {
        customMessage('Fill all of fields')
        return
    }

    data.goal_approval = goalToApproval
    data.goal_status = goalStatus
    data.pb_year = year
    data.player = player
    data.coach = coach
    data.percent_completed = completion

    var dataBefore = window.goalFormBefore
    var goalFormAfter = {
        goal_name: goalName,
        goal_term: goalTerm,
        significance: whyIsImportant,
        goals_etro: goalsRelated,
        relationship: relationBetween,
        target_date: targetDate,
        goal_approval: goalToApproval,
        coach_comments: coachComments,
        goal_status: goalStatus,
        steps: steps
    }

    var dataEmail = {
        year: year,
        goal_name: goalName,
        goal_term: goalTerm,
        coach: coachFirstName,
        coach_email: coachEmail,
        player: player,
        player_email: playerEmail
    }

    if (Object.keys(dataBefore).length) {
        var dataToSave = compareObjects(dataBefore, goalFormAfter)
    } else {
        var dataToSave = data
    }

    if (!Object.keys(dataToSave).length) {
        customMessage('Nothing to save')
        return
    }

    if (goalApproved) {
        dataToSave.goal_approved = approvedDate
    }

    var dataSaveGoal = { goalStatus, dataEmail, isCoach, id, dataToSave, player, year }

    loader(true)
    saveGoal(dataSaveGoal)


})

function saveGoal(data) {

    /*google.script.run.withSuccessHandler(async function (result) {

        if (!result.status) {
            customMessage(result.message)
            loader()
            return
        }

         getGoals()
        cleanGoalFormFields()
        customMessage(result.message)

        if (data.goalStatus == 'Ready for Approval') {
            sendMessageToCoach(data.dataEmail)
        }

        if (data.isCoach) {
            var allGoal = window.goalsCache
            var goal = allGoal.filter(value => value[3] == data.player && value[1] == data.year)
            var userGoalStatus = []

            goal.map((value) => {

                if (!userGoalStatus.includes(value[13])) {
                    userGoalStatus.push(value[13])
                }

            })

            if (!userGoalStatus.includes('Draft Goal') && !userGoalStatus.includes('Ready for Approval') && !userGoalStatus.includes('Needs Revision')) {
                cleanFormAdditionalInfo()
                $('#modal_additional_info').modal('open')
                sendMessageAdditionalInfo(data.dataEmail)
            }

            if (userGoalStatus.includes('Active') && userGoalStatus.includes('Needs Revision')) {
                var goalsNeedsRevision = goal.filter(value => value[13] == 'Needs Revision')
                sendMessageGoalsNeedRevision(data.dataEmail, goalsNeedsRevision)
            }

        }

        if (pageActive == 'Team Goal') {
            teamGoals()
        } else if (pageActive == 'Personal Goal') {
            personalGoals()
        } else {
            companyGoals()
        }

        renderPages('pb-personal-goals')
        loader()
        getGoals()

    }).withFailureHandler(function (e) {

        console.log(e)
        customMessage(e.message)
        loader()

    }).saveGoalAPI(data.id, data.dataToSave)*/
}

function sendMessageToCoach(data) {

    /*google.script.run.withSuccessHandler(function (result) {

        if (!result.status) {
            customMessage(result.message)
            loader()
        }

    }).withFailureHandler(function (e) {

        console.log(e)
        customMessage(e)
        loader()

    }).sendMessagetoCoachAPI(data)*/
}

$('#goal_name').on('click', function (element) {
    $('.helper_text_goal_name').hide()
})

$('#relation_between').on('click', function (element) {
    $('.helper_text_relation_between').hide()
})

$('#why_is_important').on('click', function (element) {
    $('.helper_text_why_is_important').hide()
})

$('.goal_term').on('click', function () {
    $('.helper_text_goal_term').hide()
})

$('.goals_related_div').on('click', function () {
    $('.helper_text_goals_related').hide()
})

$('.target_date').on('click', function () {
    $('.helper_text_target_date').hide()
})

$('.steps_li').on('click', function () {
    $('.helper_text_steps').hide()
})

$(document).on('keydown', '.steps_li', function (e) {

    if (e.which == 13 && !e.shiftKey) {
        addNewStep()
        e.preventDefault()
    }

})

function disableAllFieldsCoach() {
    $('#goal_name').prop('disabled', true)
    $('.goal_term').find('input').prop('disabled', true)
    $('#why_is_important').prop('disabled', true)
    $('#why_is_important').addClass('color_disabled')
    $('.goals_related_div').find('input').prop('disabled', true)
    $('#relation_between').prop('disabled', true)
    $('#relation_between').addClass('color_disabled')
    $(document).find('.card-content-steps .steps').find('textarea').each((index, element) => {
        $(element).prop('disabled', true)
        $(element).addClass('color_disabled')
    })
    $('.add_new_step').css('pointer-events', 'none')
    $('.target_date').prop('disabled', true)
    $('.toggle_goal_status').hide()
    $('.toggle_goal_status').find('input').prop('disabled', true)
    $('.card-content-steps').find('.steps').each(function (index, element) {
        $(this).find('i').css('pointer-events', 'none')
    })
    $('.coach_comments').find('textarea').prop('disabled', false)
    $('.toggle_goal_status_coach').show()

}

function enableAllFieldsCoach() {
    $('#goal_name').prop('disabled', false)
    $('.goal_term').find('input').prop('disabled', false)
    $('#why_is_important').removeAttr('disabled')
    $('#why_is_important').removeClass('color_disabled')
    $('.goals_related_div').find('input').prop('disabled', false)
    $('#relation_between').prop('disabled', false)
    $('#relation_between').removeClass('color_disabled')
    $(document).find('.card-content-steps .steps').find('textarea').each((index, element) => {
        $(element).prop('disabled', false)
        $(element).removeClass('color_disabled')
    })
    $('.add_new_step').css('pointer-events', 'all')
    $('.target_date').prop('disabled', false)
    $('.toggle_goal_status').show()
    $('.toggle_goal_status').find('input').prop('disabled', false)
    $('.card-content-steps').find('.steps').each(function (index, element) {
        $(this).find('i').css('pointer-events', 'all')
    })
    $('.coach_comments').find('textarea').prop('disabled', true)
    $('.toggle_goal_status_coach').hide()
}

function enableAllFields() {
    $('#goal_name').prop('disabled', false)
    $('.goal_term').find('input').prop('disabled', false)
    $('#why_is_important').removeAttr('disabled')
    $('.goals_related_div').find('input').prop('disabled', false)
    $('#relation_between').prop('disabled', false)
    $(document).find('.card-content-steps .steps').find('textarea').each((index, element) => {
        $(element).prop('disabled', false)
    })
    $('.add_new_step').css('pointer-events', 'all')
    $('.target_date').prop('disabled', false)
    $('.toggle_goal_status').find('input').prop('disabled', false)
    $('.card-content-steps').find('.steps').each(function (index, element) {
        $(this).find('i').css('pointer-events', 'all')
    })
    $('.coach_comments').find('textarea').prop('disabled', true)
}

var pageActive
$(document).on('click', '.table_goals td', function () {

    if ($(this).hasClass('delete_goal')) {
        return
    }

    var previousElement = $(this).closest('tr')
    var year = previousElement.find('.title').attr('data-year')
    var userLogged = window.userLoggedCache.name
    var title = previousElement.find('.title').text()
    var type = previousElement.find('.type').text()
    var status = previousElement.find('.status').text()
    var lastCheckin = previousElement.find('.last_checkin').text()
    var completion = previousElement.find('.completion').text()
    var id = previousElement.find('.title').attr('data-id')
    var player = previousElement.find('.title').attr('data-player')
    var coach = previousElement.find('.title').attr('data-coach')
    var commentsFromCoach = $('.coach_comments').find('textarea').val()
    var goalToApproval = $('.toggle_goal_status').find('input').prop('checked')
    var isCoach = coach == window.userLoggedCache.name
    var commentId = previousElement.closest('.collapsible-header').find("div[data-id-comments]").data("id-comments")
    var goalsId = []

    previousElement.closest('tbody').find('td:nth-child(2)').each((index, element) => {
        goalsId.push($(element).attr('data-id'))
    })

    window.additionalInfoGoalCache = {
        year: year,
        player: player,
        coach: coach,
        comment_id: commentId,
        goals_id: goalsId
    }


    $('.player_name').attr('data-id', id)

    if (userLogged != player && status == 'Draft Goal') {
        customMessage('This goal is not ready for approval')
        return
    }

    if (userLogged == player && status == 'Ready for Approval') {
        customMessage('Waiting feedback from your Coach')
        return
    }

    if (status == 'Draft Goal') {
        $('.collapse_comments_Coach').hide()
    } else {
        $('.collapse_comments_Coach').show()
    }

    loader(true)
    /*google.script.run.withSuccessHandler(function (result) {

        if (!result) {
            customMessage('Goal not found')
            loader()
            return
        }

        var user = JSON.parse(result.data).flat()
        if (user[11]) {
            var targetDate = new Date(user[11]).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            })
        } else {
            var targetDate = ''
        }

        $('#goal_name').val(title)
        $('.player_name').text(player)
        $('.coach_name').text(coach)
        $('.goal_term_select').val(type)
        $('#why_is_important').val(user[7])
        $('.goals_related').val(user[8])
        $('#relation_between').val(user[9])
        $('.target_date').val(targetDate)
        $('.target_date').attr('data-date', targetDate)
        $('.toggle_goal_status').find('input').prop('checked', user[12])
        $('.coach_comments').find('textarea').val(user[17])

        goalToApproval = user[12]

        if (user[12]) {
            $('.ready').addClass('green')
            $('.draft').removeClass('yellow')
        } else {
            $('.draft').addClass('yellow')
            $('.ready').removeClass('green')
        }

        if (user[13] == 'Active') {
            $('.toggle_goal_status_coach').find('input').prop('checked', true)
            $('.approved').addClass('green')
            $('.revision').removeClass('yellow')
        } else {
            $('.toggle_goal_status_coach').find('input').prop('checked', false)
            $('.revision').addClass('yellow')
            $('.approved').removeClass('green')
        }

        var steps = user[10].split('\n')

        window.goalFormBefore = {
            goal_name: $('#goal_name').val(),
            goal_term: $('.goal_term_select').val(),
            significance: $('#why_is_important').val(),
            goals_etro: $('.goals_related').val(),
            relationship: $('#relation_between').val(),
            target_date: $('.target_date').val(),
            goal_approval: $('.toggle_goal_status').find('input').prop('checked'),
            coach_comments: $('.coach_comments').find('textarea').val(),
            goal_status: user[13],
            steps: steps,

        }

        $('select').formSelect()
        M.updateTextFields()

        var quantityLi = $('.card-content-steps').find('.steps').length

        for (var i = 0; i < steps.length - quantityLi; i++) {
            addNewStep()
        }

        $('.card-content-steps .steps').find('textarea').each(function (index, element) {
            $(element).val(steps[index])
        })

        if (coach == userLogged && status !== 'Active') {
            $('.btn_confirm_new_goal').show()
            disableAllFieldsCoach()
        } else if (coach == userLogged && status == 'Active') {
            $('.btn_confirm_new_goal').hide()
            $('.coach_comments').find('textarea').attr('disabled', true)
            disableAllFieldsCoach()
        } else if (coach !== userLogged && status == 'Active') {
            $('.btn_confirm_new_goal').hide()
            $('.coach_comments').find('textarea').attr('disabled', true)
            disableAllFieldsCoach()
        } else {
            enableAllFieldsCoach()
            $('.coach_comments').find('textarea').attr('disabled', false)
            $('.btn_confirm_new_goal').show()
        }

        renderPages('new-goal-form')

        loader()

    }).withFailureHandler(function (e) {

        console.log(e)
        loader()

    }).getGoalByIdAPI(id)*/

})

function compareObjects(objBefore, objAfter) {
    var diffKeys = {}
    var objKeysBefore = Object.keys(objBefore)
    var objKeysAfter = Object.keys(objAfter)

    if (!objKeysBefore.length) {
        return objAfter
    }

    for (var i = 0; i < objKeysBefore.length; i++) {
        var keyBefore = objKeysBefore[i]

        if (JSON.stringify(objBefore[keyBefore]) !== JSON.stringify(objAfter[keyBefore])) {
            diffKeys[keyBefore] = objAfter[keyBefore]
        }

    }

    return diffKeys
}

function submissionsHRFromSpreadsheet() {
    loader(true)

    $('#active-process').closest('li').addClass('active')

    /*google.script.run.withSuccessHandler(function (result) {

        if (!result.status) {
            customMessage('submissions not found')
        }

        var submissions = JSON.parse(result.data)
        window.activeProcessData = submissions

        renderPages('active-process')
        $('.tbody-active-process').empty()
        loader()

        submissions.forEach((element, index) => {

            var id = element[40]
            var processType = 'Onboard'
            var firstWorkDate = element[2].split('T')[0]
            var processStartDate = element[3].split('T')[0]
            var fullName = element[4] + ' ' + element[5]
            var title = element[12]
            var status = 'Active'

            $('.tbody-active-process').append(
                `
                    <tr data-id="${id}">
                        <td>${processType}</td>
                        <td>${firstWorkDate}</td>
                        <td>${fullName}</td>
                        <td>2023-06</td>
                        <td>${title}</td>
                        <td>${status}</td>
                    </tr>
                `
            )

        })

    }).withFailureHandler(function (e) {

        customMessage(e)
        loader()

    }).submissionsHR()*/
}

function personalGoals() {
    var userLogged = window.userLoggedCache
    var users = window.usersSpreadsheetCache
    var goals = window.goalsCache
    var usersName = []
    var goalsPlayerNames = []
    var usersFiltered = users.filter(value => value[3] == userLogged.name)
    var goalsFiltered = goals.filter(value => value[3] == userLogged.name)

    pageActive = 'Personal Goal'
    usersFiltered.sort((a, b) => { return a[3].localeCompare(b[3]) })

    goalsFiltered.sort((a, b) => {

        if (a[1] === b[1]) {
            return a[3].localeCompare(b[3])
        } else {
            return a[1] - b[1]
        }

    })

    goalsFiltered.map((value) => {
        if (!goalsPlayerNames.includes(value[3])) {
            goalsPlayerNames.push(value[3])
        }
    })

    usersFiltered.map((value) => {
        usersName.push(value[3])
    })

    usersName.map((value) => {

        if (!goalsPlayerNames.includes(value)) {
            goalsFiltered.push(['', 2024, '', value, '', '', '', '', '', '', '', '', '', '', '', '', ''])
        }

    })

    if (usersFiltered.length) {
        $('.pb-card-title').find('span').text('')
        $('.pb-card-title').find('span').text('Personal Goal')
        $('.filters_pb_year').hide()
        createCardCollapseToPB(usersFiltered, goalsFiltered)
        $('.collapsible.popout.collapse-people-builder li:first').addClass('active')
        $('.collapsible').collapsible()
        loader()
    } else {
        customMessage(`You aren't on the ETRO Team`)
        loader()
    }
}

function teamGoals() {
    var userLogged = window.userLoggedCache
    var users = window.usersSpreadsheetCache
    // var users = window.usersFromGoogleCache
    var goals = window.goalsCache
    var usersName = []
    var goalsPlayerNames = []
    var usersFiltered = users.filter(value => value[20].replace('Coach: ', '').includes(userLogged.name))
    pageActive = 'Team Goal'

    usersFiltered.map((value) => {
        if (!goalsPlayerNames.includes(value[3])) {
            goalsPlayerNames.push(value[3])
        }
    })

    var goalsFiltered = goals.filter(value => goalsPlayerNames.includes(value[3]))

    usersFiltered.sort((a, b) => { b[3].localeCompare(a[3]) })

    goalsFiltered.map((value) => {
        if (!usersName.includes(value[3])) {
            usersName.push(value[3])
        }
    })

    goalsPlayerNames.map((value) => {

        if (!usersName.includes(value)) {
            goalsFiltered.push(['', 2024, '', value, '', '', '', '', '', '', '', '', '', 'No Goal', '', '', ''])
        }

    })

    if (goalsFiltered.length) {
        $('.filters_pb_year').show()
    } else {
        $('.filters_pb_year').hide()
    }

    if (goalsFiltered.length) {
        $('.pb-card-title').find('span').text('')
        $('.pb-card-title').find('span').text('Team Goal')
        $('.filters_pb_year').show()
        createCardCollapseToPB(usersFiltered, goalsFiltered)
        loader()
    } else {
        customMessage(`You have no members with goals`)
        loader()
    }

}

function companyGoals() {
    var users = window.usersSpreadsheetCache
    var goals = window.goalsCache
    var goalsPlayerNames = []
    var usersName = []
    pageActive = 'Company Goal'

    $('.pb-card-title').find('span').text('')
    $('.pb-card-title').find('span').text('Company Goal')

    users.map((value) => {
        usersName.push(value[3])
    })

    goals.map((value) => {
        goalsPlayerNames.push(value[3])
    })

    usersName.map((value) => {

        if (!goalsPlayerNames.includes(value)) {
            goals.push(['', 2024, '', value, '', '', '', '', '', '', '', '', '', 'No Goal', '', '', ''])
        }

    })

    if (!goals.length) {
        $('.filters_pb_year').hide()
    } else {
        $('.filters_pb_year').show()
    }

    createCardCollapseToPB(users, goals)
    loader()
}

$('.refresh-pb').on('click', async function () {
    loader(true)
    usersFromSpreadsheet()
    //  goalsComments()
    getGoals()

    if (pageActive == 'Personal Goal') {
        personalGoals()
    } else if (pageActive == 'Team Goal') {
        initializeAutocompleteSearchName()
        teamGoals()
    } else {
        initializeAutocompleteSearchName()
        companyGoals()
    }
})

$('.pb-personal-goals-menu').on('click', async function () {
    loader(true)
    //  usersFromSpreadsheet()
    getGoals()
    personalGoals()
})

$('.pb-team-goals-menu').on('click', async function () {
    loader(true)
    //  usersFromSpreadsheet()
    getGoals()
    initializeAutocompleteSearchName()
    teamGoals()
})

$('.pb-company-goals-menu').on('click', async function () {
    loader(true)
    //  usersFromSpreadsheet()
    getGoals()
    initializeAutocompleteSearchName()
    companyGoals()
})

function initializeAutocompleteSearchName() {
    var emails = {}
    var users = window.usersSpreadsheetCache

    users.map((value) => {
        emails = { ...emails, [value[3]]: null }
    })

    $('input.autocomplete').autocomplete({
        data: emails,
        limit: 20
    })
}

function addNewStep() {
    var quantityLi = $('.card-content-steps').find('.steps').length
    var element = `<div class="row steps">
                        <span>Step ${quantityLi + 1}:</span>
                        <textarea placeholder="" type="text" class="steps_li validate"></textarea>
                        <i style="display:none;" class="remove_step right-align material-icons">delete</i>
                    </div>`
    $('.card-content-steps').append(element)
    var textareas = $('.card-content-steps').find('textarea')
    var ultimoTextarea = textareas[textareas.length - 1]

    $(ultimoTextarea).focus()

}

$('.add_new_step').on('click', function (e) {
    e.preventDefault()
    addNewStep()

})

function removeDivStep(element) {
    element.closest('div').remove()
    $('.card-content-steps').find('.steps').each(function (index, element) {
        $(this).find('span').text(`Step ${index + 1}:`)
    })
}


$(document).on('click', '.remove_step', function () {
    removeDivStep($(this))
})


$(document).on("mouseenter", '.steps', function () {

    if (!(window.userLoggedCache.name == $('.coach_name').text())) {
        $(this).find('i').show()
    }

}).on("mouseleave", '.steps', function () {

    if (!(window.userLoggedCache.name == $('.coach_name').val())) {
        $(this).find('i').hide()
    }

})


$('.pb-form-menu').on('click', function () {
    renderPages('people-builder-form')
})

function submissonsPeopleBuilderFromSpreadsheet() {
    loader(true)

    /*google.script.run.withSuccessHandler(function (result) {

        if (!result.status) {
            customMessage('submissions not found')
        }

        var submissions = JSON.parse(result.data)
        window.peopleBuilderData = submissions

        renderPages('people-builder-list')
        $('.tbody-people-builder-list').empty()
        loader()

        submissions.forEach((element, index) => {

            var player = element[2]
            var goalType = element[4]
            var targetDate = element[7].split('T')[0]
            var lastCheckin = element[1]?.split('T')[0] || ''
            var status = 'Status (check labels)'

            $('.tbody-people-builder-list').append(
                `
                    <tr class='edit-submission-row' edit-submission="https://www.jotform.com/edit/${element[9]}" >
                        <td>${player}</td>
                        <td>${goalType}</td>
                        <td>${targetDate}</td>
                        <td>${lastCheckin}</td>
                        <td>${status}</td>
                        <td>
                            <div>
                                <i class="icon-edit-submission material-icons prefix hide">control_point</i>
                            </div>
                        </td>
                    </tr>
                `
            )

        })
        editSubmissionPeopleBuilder()
        hoverButtonEditPeopleBuilder()

    }).withFailureHandler(function (e) {

        customMessage(e)
        loader()

    }).submissionsPeopleBuilder()*/
}

$('#file_url').on('change', function () {
    var url = $(this).val()
    var id = url.match(/[-\w]{25,}/)[0]
    var urlPreview = `https://drive.google.com/file/d/${id}/preview`
    $('.preview_pdf').find('iframe').show()
    $('.preview_pdf').find('iframe').attr('src', urlPreview)

})

function bringPdfPeopleBuilder() {
    loader(true)
    /*google.script.run.withSuccessHandler(function (result) {
        var result = JSON.parse(result)
        var dataActive = result.filter(value => value[9] == 'active')

        if (!dataActive.length) {
            customMessage('Have no People Builder Setup yet')
            loader()
            return
        }

        var url = dataActive[0][4]
        var id = url.match(/[-\w]{25,}/)[0]
        var urlPreview = `https://drive.google.com/file/d/${id}/preview`
        $('.pdf_people_builder').attr('src', urlPreview)
        loader()

    }).bringPdfPeopleBuilderAPI()*/

}

function saveSettingsPeopleBuilderAPI(id, data) {
    loader(true)
    /*google.script.run.withSuccessHandler(function (result) {

        if (!result.status) {
            customMessage(result.message)
            loader()
            return
        }

        customMessage(result.message)
        loader()
        renderPages('users-list')


    }).withFailureHandler(function (e) {

        customMessage(result.message)
        loader()

    }).saveSettingsPeopleBuilderAPI(id, data)*/
}

$('.btn-confirm-settings-pb').on('click', function () {
    var startDate = $('.start_date').val()
    var endDate = $('.end_date').val()
    var urlPDF = $('#file_url').val()
    var midYearCheckin = $('.mid_year_select').val()
    var midYearCheckin = $('.end_year_select').val()
    var id = ''

    var data = {
        start_date: startDate,
        end_date: endDate,
        file: urlPDF,
        mid_year_checkin: midYearCheckin,
        end_year_checkin: midYearCheckin
    }

    saveSettingsPeopleBuilderAPI(id, data)
    cleanSettingsPeopleBuilderForm()

})

function cleanSettingsPeopleBuilderForm() {
    $('.start_date').val('')
    $('.end_date').val('')
    $('#file_url').val('')
    $('.mid_year_select').val('')
    $('.end_year_select').val('')
    $('.preview_pdf').find('iframe').attr('src', '')
    $('.preview_pdf').find('iframe').hide()

}

$('.btn_cancel_settings_pb').on('click', function () {
    renderPages('users-list')
})

function editSubmissionPeopleBuilder() {
    // loader(true)
    $('.icon-edit-submission').closest('tr').on('click', function () {
        loader(true)

        var linkEditSubmission = $(this).attr('edit-submission')
        $('#JotFormIFrame-233454588860063').attr('src', linkEditSubmission)
        renderPages('people-builder-form')
        loader()
        // window.open(linkEditSubmission)
    })
}

function hoverButtonEditPeopleBuilder() {
    $('.edit-submission-row').hover((e) => {
        $(e.currentTarget).find('.icon-edit-submission').removeClass('hide')
    }, (e) => {
        $(e.currentTarget).find('.icon-edit-submission').addClass('hide')
    })
}

$('.users').on('click', function () {

    loader(true)
    bringUsersOnHome()

})

async function prepareFormToNewGoal() {
    var toggleStatus = $('.toggle_goal_status').find('input[type="checkbox"]').prop('checked')
    var users = window.usersSpreadsheetCache
    var userLogged = window.userLoggedCache
    var user = users.filter(value => value[3] == userLogged.name).flat()
    var coachEmail = user[26]
    var playerEmail = user[4]

    $('.player_name').attr('data-coach-email', coachEmail)
    $('.player_name').attr('data-player-email', playerEmail)

    $('.target_date').datepicker({
        format: 'mmmm dd, yyyy',
        autoClose: true,
        firstDay: 1,
        defaultDate: new Date().toISOString().split('T')[0],
        setDefaultDate: true,
        onSelect: function (date) {
            $('.target_date').attr('data-date', date.toISOString().split('T')[0])
        },
        setDate: new Date()
    })

    $('.toggle_goal_status_coach').hide()
    $('.toggle_goal_status').show()
    pageActive = $('.pb-card-title').find('span').text()
    enableAllFieldsCoach()
    window.goalFormBefore = {}
    cleanGoalFormFields()
    $('.player_name').text(user[3])
    $('.coach_name').text(user[20]?.replace('Coach: ', ''))
    $('.collapse_comments_Coach').hide()
    $('.player_name').attr('data-id', '')
    enableAllFields()

    if (toggleStatus) {
        $('.draft').removeClass('yellow')
        $('.ready').addClass('green')
    } else {
        $('.draft').addClass('yellow')
        $('.ready').removeClass('green')
    }

    renderPages('new-goal-form')

}

$(document).on('click', '.btn_first_goal', async function () {
    prepareFormToNewGoal()
    $('#goal_name').focus()
})

$(document).on('click', '.btn-new-goal', async function () {
    var goals = window.goalsCache
    var userLogged = window.userLoggedCache
    var user = goals.filter(value => value[3] == userLogged.name).flat()

    if (!user.length) {
        loader(true)
        //  usersFromSpreadsheet()
        bringPdfPeopleBuilder()
        renderPages('pdf_people_builder_page')
        return
    }

    prepareFormToNewGoal()

})

function loader(state) {

    if (state) {
        $("#loader").show()
    } else {
        $("#loader").hide()
    }
}

function disableFiedsProfilePage() {
    $('#profile-title').prop('disabled', true)
    $('#profile-coach').prop('disabled', true)
    $('#profile-manager').prop('disabled', true)
    $('#work-address').prop('disabled', true)
    $('#profile-department').prop('disabled', true)
    $('#type_phone').prop('disabled', true)
    $('#phone').prop('disabled', true)
    $('.btn-update-user').hide()
    $('select').formSelect()
}

function enableFiedsProfilePage() {
    $('#profile-title').prop('disabled', false)
    $('#profile-coach').prop('disabled', false)
    $('#profile-manager').prop('disabled', false)
    $('#work-address').prop('disabled', false)
    $('#profile-department').prop('disabled', false)
    $('#type_phone').prop('disabled', false)
    $('#phone').prop('disabled', false)
    $('.btn-update-user').show()
    $('select').formSelect()
}


$(document).on('click', '.tbody-users td', function () {

    var name = $(this).closest('tr').find('.td_image_fullname').text().trim()
    var email = $(this).closest('tr').find('.td_email').text().trim()
    var id = $(this).closest('tr').find('.td_email').attr('data-id')
    var title = $(this).closest('tr').find('.td_title').text().trim()
    var manager = $(this).closest('tr').find('.td_manager').text().trim()
    var coach = $(this).closest('tr').find('.td_coach').text().trim()
    var address = $(this).closest('tr').find('.td_address').attr('data-id')
    var phone = $(this).closest('tr').find('.td_phone').text().trim()
    var phoneType = $(this).closest('tr').find('.td_phone').attr('phone-type')
    var department = $(this).closest('tr').find('.td_department').text().trim()
    var foto = $(this).closest('tr').find('img').attr('src')
    var userCache = window.usersSpreadsheetCache
    var user = userCache.filter(value => value[0] == id)

    if (user.length > 1 || !user) {
        customMessage('User not found')
        return
    }

    var admin = user[0][5] || user[0][6]

    if (admin) {
        disableFiedsProfilePage()
        $('#card-name').css({
            'background-color': '#fafafa',
            'color': 'rgb(0,0,0,0.85)'
        })
        $('.suspended-message').hide()
        $('.btn-suspend').hide()
    } else if (user[0][9]) {
        disableFiedsProfilePage()
        $('.btn-suspend').show()
        $('#card-name').css({
            'background-color': '#A6A8AB',
            'color': 'white'
        })
        $('.suspended-message').show()
        $('.btn-suspend').children().remove()
        $('.btn-suspend').append(`
                <a 
                    class="waves-effect waves-light right green btn-small tooltipped modal-trigger" 
                    data-target="suspend-user-modal" 
                    data-position="top" 
                    data-tooltip="This action will activate the user's ETRO accounts.">
                        <i class="material-icons left">done</i>Activate
                </a>
            `)
        $('#suspend-user-modal .modal-content h4').text('WARNING!')
        $('#suspend-user-modal .modal-content p').html(`You are about to activate <b>${user[0][3]}</b> accounts.<br>Are you sure you want to do this?`)

    } else if (!user[0][9]) {
        enableFiedsProfilePage()
        $('.btn-suspend').show()
        $('#card-name').css({
            'background-color': '#fafafa',
            'color': 'rgb(0,0,0,0.85)'
        })
        $('.suspended-message').hide()
        $('.btn-suspend').children().remove()
        $('.btn-suspend').append(`
                <a 
                    class="waves-effect waves-light right orange btn-small tooltipped modal-trigger" 
                    data-target="suspend-user-modal" 
                    data-position="top" 
                    data-tooltip="This action will suspend the user's ETRO accounts.">
                        <i class="material-icons left">block</i>Suspend
                </a>
            `)
        $('#suspend-user-modal .modal-content h4').text('WARNING!')
        $('#suspend-user-modal .modal-content p').html(`You are about to suspend <b>${user[0][3]}</b> accounts.<br>Are you sure you want to do this?`)

    } else {
        enableFiedsProfilePage()
        $('.btn-suspend').show()
        $('#card-name').css({
            'background-color': '#fafafa',
            'color': 'rgb(0,0,0,0.85)'
        })
        $('.suspended-message').hide()
        $('.btn-suspend').children().remove()
    }

    $('.chip-admin').text(`${admin ? 'Admin' : 'Member'}`)
    $('#meuSelect option[value="meuValor"]').prop('selected', true)
    $('.img-card-profile').attr('src', foto)
    $('.name-employee').text(name)
    $('#email').attr('data-id', id)
    $('#email').text(email)
    $('#profile-title').val(title)
    $(`#profile-coach`).val(coach)
    $(`#profile-manager`).val(manager)
    $(`#work-address`).val(address)
    $(`#phone`).val(phone)
    $('#profile-department').val(department)
    $('#type_phone').val(phoneType)
    $('select').formSelect()
    $('.tooltipped').tooltip()
    $('.modal').modal()
    renderPages('profile-page')

})

function customMessage(msg) {
    var msgHtml = `<span>${msg}</span><button class="btn-flat toast-action">Ok</button`;
    if (msg != 'Done') {
        color = 'red'
        time = 4000
    } else {
        color = 'green'
        time = 2000
    }

    var toastInstance = M.toast({ html: msgHtml, displayLength: time, timeRemaining: 20000, classes: color })
    var toastElement = $('.toast-action')

    $(toastElement).on('click', () => {
        toastInstance.dismiss();
    })

}
