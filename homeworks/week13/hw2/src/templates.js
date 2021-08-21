/* eslint-disable */

export const CARD_TEMPLATE = `
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">$nickname</h5>
      <p class="card-text">$content</p>
    </div>
  </div>
  `

export const CSS_TEMPLATE = `.container{margin: 2rem auto;} .card{margin: 1rem 0;} .card:first-of-type{margin-top: 2rem;}`

export function getFormTemplate(prefix) {
  return `
    <h1 class="text-center">${prefix} 留言板</h1>
    <form class="${prefix}-board-form">
      <div class="form-group">
        <label>暱稱</label>
        <input type="text" class="form-control" name="nickname" aria-describedby="emailHelp" required>
      </div>
      <div class="form-group">
        <label>留言內容</label>
        <textarea class="form-control" name="content" rows="3" required></textarea>
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
    <div class="${prefix}-comments">
    </div>
    <div class="row mt-5">
      <div class="col text-center">
        <button type="button" class="btn btn-success btn-lg ${prefix}-btn-more d-none">more</button>
      </div>
    </div>
  `
}