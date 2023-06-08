/**
 * pommesbude controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::pommesbude.pommesbude', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.db.query('api::pommesbude.pommesbude').findOne({
      where: { slug: id }
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  }
}));
