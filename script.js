body{
    background:#FCF9EA;
    font-family:Arial,sans-serif;
    margin:0;
    padding:20px;
}

.header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:20px;
}

.header h1{
    margin:0;
}

.clocks{
    text-align:right;
    font-size:14px;
}

.tabs{
    display:flex;
    gap:10px;
    margin-bottom:20px;
}

.tabs button{
    background:#FF933E;
    border:none;
    color:white;
    padding:12px 20px;
    cursor:pointer;
    border-radius:10px;
}

.active{
    opacity:1;
}

.card{
    background:white;
    border:1px solid #ddd;
    border-radius:15px;
    padding:20px;
}

label{
    display:block;
    margin-top:15px;
    margin-bottom:5px;
    font-weight:600;
}

input,
select,
textarea{
    width:100%;
    padding:12px;
    border:1px solid #ddd;
    border-radius:10px;
    box-sizing:border-box;
}

textarea{
    min-height:100px;
}

.reminder{
    background:#FFF8D6;
    border:1px solid #F0D984;
    padding:12px;
    margin-top:20px;
    border-radius:10px;
    font-weight:600;
}

.attestation{
    margin-top:20px;
    display:flex;
    gap:10px;
}

.buttons{
    display:flex;
    gap:10px;
    margin-top:20px;
}

.buttons button{
    background:#FF933E;
    border:none;
    color:white;
    padding:12px 20px;
    border-radius:10px;
    cursor:pointer;
}

.hidden{
    display:none;
}

.history-card{
    background:white;
    border:1px solid #ddd;
    padding:15px;
    margin-bottom:15px;
    border-radius:10px;
}

.history-card pre{
    white-space:pre-wrap;
}

@media(max-width:768px){

.header{
    flex-direction:column;
    align-items:flex-start;
}

.buttons{
    flex-direction:column;
}

}
