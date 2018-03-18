
function initializeCardList(){
    $('#btnAddLine').on('click', function (e) {
        addEmptyLine();
    });

    $( document ).on( 'blur', '#cardsTable input', function (e) {
        saveDataChanges(e.target);
    });

    $('#btnAddColumn').on('click', function (e) {
        addColumn();
    });

    $('#addColumnModal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
    })
}



function regenerateTable(){
    $("#cardsTable").empty();
    //Generate header
    let tr = $("<tr></tr>");
    tr.append($("<th scope='col'>#</th>"));
    for (let i=0;i<varNames.length;i++){
        tr.append(
            tr.append($("<th scope='col'>"+varNames[i]+"</th>"))
        );
    }

    $("#cardsTable").append(
        $("<thead></thead>").append(
            tr
        )
    );

    //Generate body
    let tbody = $("<tbody id='cardsTableBody'></tbody>");
    $("#cardsTable").append(tbody);


    for (let numCard=0;numCard<cardsData.length;numCard++){
        addLine(numCard+1,cardsData[numCard]);
    }

}

function addEmptyLine(){
    cardsData.push(emptyData);
    addLine(cardsData.length, emptyData);
}

function addLine(numLine, lineData){
    tr = $("<tr class='card-data'></tr>");
    tr.append($("<th scope='row'>"+numLine+"</th>"));
    for (let i=0;i<varNames.length;i++){
        tr.append(
            $("<td></td>").append(
                $("<input></input>")
                    .attr("type","text")
                    .attr("data-numcard", numLine-1)
                    .attr("data-var",varNames[i])
                    .attr("value", lineData[varNames[i]])
            )
        );
    }
    $("#cardsTableBody").append(tr);
    updateSampleCardList();
}

function saveDataChanges(item){
    item = $(item);
    cardsData[item.attr("data-numcard")][item.attr("data-var")] = item.val();
    updateSampleCardList();
}

function addColumn(){
    let name = $("#newColumnName").val();
    if (varNames.indexOf(name)>-1){
        alert("That column already exists");
    } else {
        varNames.push(name);
        for (let numCard=0;numCard<cardsData.length;numCard++){
            cardsData[numCard][name]="";
            regenerateTable();
        }
    }
    
}




