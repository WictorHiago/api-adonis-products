import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UpdateCategoryService from '#services/categories/update_category.service'

@inject()
export default class UpdateCategoryController {
  constructor(private updateCategoryService: UpdateCategoryService) {}

  public async update({ params, request, response }: HttpContext) {
    const { id } = params
    const { name_category, description_category } = request.body()

    try {
      if (!id || !name_category || !description_category) {
        return response.badRequest('Missing required fields')
      }

      const category = await this.updateCategoryService.update(id, {
        name_category,
        description_category,
      })

      return response.status(201).json({ updated: category })
    } catch (error) {
      if (error instanceof Error) {
        return response.badRequest({ error: error.message })
      }
      return response.badRequest(error)
    }
  }
}
