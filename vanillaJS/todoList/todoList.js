window.onload = function () {
  const btnAdd = document.querySelector('.btn-add');
  btnAdd.addEventListener('click', function () {
    const inputValue = document.querySelector(".opt-input").value;
    if (inputValue === '') {
      alert("내용을 입력하세요.");
    } else {
      alert("입력한 내용이 저장 되었습니다.");
      document.querySelector(".opt-input").value = '';
      document.querySelector(".todo-lst").innerHTML += `
        <li>
          <div class="txt">`+ inputValue + `</div>
          <div class="btn">
            <button class="btn-modify">수정</button>
          </div>
        </li>
      `;
    }
  }, false);

  let flag = false;

  // 편집
  const btnEdit = document.querySelector('.btn-edit');
  btnEdit.addEventListener('click', function (e) {
    const target = e.target;

    if (!flag) {
      flag = true;
      target.innerText="취소";
      document.querySelectorAll(".edit-group").forEach( e => {
        e.classList.remove("hide");
      });
    } else {
      flag = false;
      target.innerText="편집";
      document.querySelectorAll(".edit-group").forEach( e => {
        e.classList.add("hide");
      });
    }

    document.querySelectorAll(".todo-lst li").forEach( e => {
      const txt = e.children[0];
      const btn = e.children[1];
      if (flag) {
        txt.innerHTML = '<label><input type="checkbox" name="chkList" />' + txt.innerText + "</label>";
        btn.classList.add("hide");
      } else {
        txt.innerHTML = txt.innerText;
        btn.classList.remove("hide");
      }
    });
  });

  // checkbox Hide
  function chkboxHide() {
    flag = false;
    document.querySelector(".btn-edit").innerText = "편집";
    document.querySelectorAll(".edit-group").forEach( e => {
      e.classList.add("hide");
    });

    document.querySelectorAll(".todo-lst li").forEach( e => {
      const txt = e.children[0];
      const btn = e.children[1];
      txt.innerHTML = txt.innerText;
      if (!e.classList.contains("completed")) {
        btn.classList.remove("hide");
      }
    });
  }

  // checkbox Checked
  function chkboxChecked(state) {
    let txt = '';
    let chk = false;

    document.querySelectorAll("input[type=checkbox]").forEach(e => {
      const target = e.parentNode.parentNode.parentNode;
      if (e.checked === true) {
        chk = true;
        
        if (state === 'delete') {
          document.querySelector(".todo-lst").removeChild(target);
        } else if (state === 'completed') {
          target.classList.add("completed");
        } else if (state === 'active') {
          target.classList.remove("completed");
        }
      }
    });

    if (state === 'delete') txt = '삭제';
    else if (state === 'completed') txt = '완료';
    else if (state === 'active') txt = '진행으로 변경';

    if (!chk) {
      alert("선택된 항목이 없습니다.");
    } else {
      chkboxHide();
      alert("선택한 항목이 " + txt + "되었습니다.");
    }
  }

  // 리스트 항목 삭제
  const btnDel = document.querySelector('.btn-delete');
  btnDel.addEventListener('click', function (e) {
    chkboxChecked('delete');
  });

  // 리스트 항목 완료
  const btnComp = document.querySelector('.btn-comp');
  btnComp.addEventListener('click', function () {
    chkboxChecked('completed');
  });

  // 리스트 항목 진행
  const btnActive = document.querySelector('.btn-active');
  btnActive.addEventListener('click', function () {
    chkboxChecked('active');
  });

  // 리스트 수정
  let defaultValue;
  const btnModify = document.querySelectorAll('.btn-modify');
  // let mmm = false;
  btnModify.forEach(e => {
    e.addEventListener('click', function (e) {
      const btnTarget = e.target;
      const btnWrap = btnTarget.parentNode.parentNode;
      const btnEdit = document.querySelector(".btn-edit");
      const modifyTxt = btnTarget.parentNode.parentNode.children[0];
      defaultValue = modifyTxt.innerText;

      if (!flag) {
        flag = true;
        btnTarget.innerText = "저장";
        btnWrap.classList.add("modify");
        btnEdit.removeAttribute("enabled", "");
        btnEdit.setAttribute("disabled", "");
        modifyTxt.innerHTML = '<input type="text" value="' + modifyTxt.innerText + '" />';
        btnTarget.insertAdjacentHTML('afterend', '<button class="btn-cancle">취소</button>');
        setBtnCancle(btnTarget);
      } else {
        console.log("mod>>>", flag);
        flag = false;
        btnTarget.innerText = "수정";
        btnTarget.nextElementSibling.remove();
        btnWrap.classList.remove("modify");
        btnEdit.setAttribute("enabled", "");
        btnEdit.removeAttribute("disabled", "");
        modifyTxt.innerHTML = btnWrap.querySelector("input").value;
      }
    });
  });

  // 리스트 수정 취소
  function setBtnCancle(e) {
    const btnCancle = e.nextElementSibling;

    btnCancle.addEventListener('click', function (e) {
      const btnTarget = e.target;
      const btnWrap = btnTarget.parentNode.parentNode;
      const modifyTxt = btnWrap.children[0];
      flag = false;
      btnTarget.previousElementSibling.innerText = "수정";
      btnTarget.remove();
      btnWrap.classList.remove("modify")
      document.querySelector(".btn-edit").setAttribute("enabled", "");
      document.querySelector(".btn-edit").removeAttribute("disabled", "");
      modifyTxt.innerHTML = defaultValue;
    });
  }
}